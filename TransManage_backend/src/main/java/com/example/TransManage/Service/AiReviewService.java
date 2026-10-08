package com.example.TransManage.Service;

import com.example.TransManage.Model.AiReviewResponse;
import com.example.TransManage.Model.Translation;
import com.example.TransManage.Model.TranslationKey;
import com.example.TransManage.Repository.TranslationKeyRepository;
import com.example.TransManage.Repository.TranslationRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AiReviewService {
	private static final Pattern PLACEHOLDER_PATTERN = Pattern.compile("\\{[^}]+}|%[sd]|\\$\\d+");

	private final TranslationRepository translationRepository;
	private final TranslationKeyRepository translationKeyRepository;

	public AiReviewService(
			TranslationRepository translationRepository,
			TranslationKeyRepository translationKeyRepository) {
		this.translationRepository = translationRepository;
		this.translationKeyRepository = translationKeyRepository;
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

		List<String> issues = new ArrayList<>();
		String translatedText = translation.getTranslatedText();

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

		int score = Math.max(0, 100 - (issues.size() * 25));
		String recommendation = issues.isEmpty() ? "APPROVED" : "REVIEW_REQUIRED";

		return new AiReviewResponse(score, issues, translatedText, recommendation);
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
