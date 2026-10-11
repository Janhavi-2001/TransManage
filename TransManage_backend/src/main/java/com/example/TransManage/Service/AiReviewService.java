package com.example.TransManage.Service;

import com.example.TransManage.Model.AiReviewResponse;
import com.example.TransManage.Model.Translation;
import com.example.TransManage.Model.TranslationKey;
import com.example.TransManage.Repository.TranslationKeyRepository;
import com.example.TransManage.Repository.TranslationRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AiReviewService {
	private static final Pattern PLACEHOLDER_PATTERN = Pattern.compile("\\{[^}]+}|%[sd]|\\$\\d+");

	private final TranslationRepository translationRepository;
	private final TranslationKeyRepository translationKeyRepository;
	private final RestClient aiClient;
	private final ObjectMapper objectMapper;
	private final String aiApiKey;
	private final String aiModel;

	public AiReviewService(
			TranslationRepository translationRepository,
			TranslationKeyRepository translationKeyRepository,
			RestClient.Builder restClientBuilder,
			ObjectMapper objectMapper,
			@Value("${ai.api-key:}") String aiApiKey,
			@Value("${ai.base-url:https://api.openai.com/v1}") String aiBaseUrl,
			@Value("${ai.model:gpt-4o-mini}") String aiModel) {
		this.translationRepository = translationRepository;
		this.translationKeyRepository = translationKeyRepository;
		this.aiClient = restClientBuilder.baseUrl(aiBaseUrl).build();
		this.objectMapper = objectMapper;
		this.aiApiKey = aiApiKey;
		this.aiModel = aiModel;
	}

	public AiReviewResponse reviewTranslation(
			Long projectId,
			Long pageId,
			Long translationKeyId,
			Long translationId) {
		Translation translation = translationRepository.findById(translationId)
				.orElseThrow(() -> new RuntimeException("Translation not found"));
		TranslationKey translationKey = translationKeyRepository.findById(translationKeyId)
				.orElseThrow(() -> new RuntimeException("Translation key not found"));

		String translatedText = translation.getTranslatedText();
		List<String> localIssues = collectLocalIssues(translationKey, translatedText);

		if (aiApiKey.isBlank()) {
			return localReview(translatedText, localIssues,
					"AI provider is not configured; only local checks were run");
		}

		try {
			return requestAiReview(translationKey, translation, localIssues);
		} catch (RuntimeException exception) {
			return localReview(translatedText, localIssues,
					"AI provider was unavailable; only local checks were run");
		}
	}

	private AiReviewResponse localReview(
			String translatedText,
			List<String> localIssues,
			String providerIssue) {
		List<String> issues = new ArrayList<>(localIssues);
		issues.add(providerIssue);
		return new AiReviewResponse(
				localScore(localIssues),
				issues,
				translatedText,
				"REVIEW_REQUIRED");
	}

	private List<String> collectLocalIssues(TranslationKey translationKey, String translatedText) {
		List<String> issues = new ArrayList<>();
		if (translatedText == null || translatedText.isBlank()) {
			issues.add("Translation text is empty");
		}

		if (translatedText != null
				&& translationKey.getCharacterLimit() != null
				&& translatedText.length() > translationKey.getCharacterLimit()) {
			issues.add("Translation exceeds the character limit");
		}

		Set<String> sourcePlaceholders = extractPlaceholders(translationKey.getSourceText());
		Set<String> translatedPlaceholders = extractPlaceholders(translatedText);
		if (!translatedPlaceholders.containsAll(sourcePlaceholders)) {
			issues.add("Translation is missing one or more placeholders from the source text");
		}
		return issues;
	}

	private AiReviewResponse requestAiReview(
			TranslationKey translationKey,
			Translation translation,
			List<String> localIssues) {
		String prompt = """
			Review this localization entry and return JSON only.

			Source text: %s
			Target language: %s
			Current translation: %s
			Context: %s
			Key type: %s
			Character limit: %s

			Preserve every placeholder exactly, including values such as {username}, %%s, and $1.
			Return an object with these fields:
			{"score": number from 0 to 100, "issues": [string], "suggestedText": string, "recommendation": "APPROVED" or "REVIEW_REQUIRED"}
			""".formatted(
				safeText(translationKey.getSourceText()),
				safeText(translation.getTargetLanguage()),
				safeText(translation.getTranslatedText()),
				safeText(translationKey.getDescription()),
				safeText(translationKey.getKeyType()),
				String.valueOf(translationKey.getCharacterLimit()));

		Map<String, Object> request = Map.of(
				"model", aiModel,
				"temperature", 0.2,
				"messages", List.of(
						Map.of("role", "system", "content", "You are a precise localization quality reviewer."),
						Map.of("role", "user", "content", prompt)));

		JsonNode response = aiClient.post()
				.uri("/chat/completions")
				.header("Authorization", "Bearer " + aiApiKey)
				.contentType(MediaType.APPLICATION_JSON)
				.body(request)
				.retrieve()
				.body(JsonNode.class);

		try {
			String content = response.path("choices").path(0).path("message").path("content").asText();
			JsonNode review = objectMapper.readTree(stripCodeFence(content));
			List<String> issues = new ArrayList<>(localIssues);
			review.path("issues").forEach(issue -> {
				if (issue.isTextual() && !issues.contains(issue.asText())) {
					issues.add(issue.asText());
				}
			});
			int aiScore = review.path("score").asInt(localScore(localIssues));
			int score = Math.max(0, Math.min(localScore(localIssues), aiScore));
			String recommendation = issues.isEmpty() && "APPROVED".equals(review.path("recommendation").asText())
					? "APPROVED" : "REVIEW_REQUIRED";
			return new AiReviewResponse(
					score,
					issues,
					review.path("suggestedText").asText(translation.getTranslatedText()),
					recommendation);
		} catch (Exception exception) {
			throw new IllegalStateException("AI provider returned an invalid review response", exception);
		}
	}

	private int localScore(List<String> issues) {
		return Math.max(0, 100 - (issues.size() * 25));
	}

	private String stripCodeFence(String content) {
		return content.replaceFirst("^```(?:json)?\\s*", "").replaceFirst("\\s*```$", "").trim();
	}

	private String safeText(Object value) {
		return value == null ? "" : String.valueOf(value);

	}

	private Set<String> extractPlaceholders(String text) {
		Set<String> placeholders = new HashSet<>();
		if (text == null) {
			return placeholders;
		}

		Matcher matcher = PLACEHOLDER_PATTERN.matcher(text);
		while (matcher.find()) {
			placeholders.add(matcher.group());
		}
		return placeholders;
	}
}
