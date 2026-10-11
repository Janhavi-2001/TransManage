package com.example.TransManage.Service;

import com.example.TransManage.Model.AiReviewResponse;
import com.example.TransManage.Model.Translation;
import com.example.TransManage.Model.TranslationKey;
import com.example.TransManage.Repository.AiReviewHistoryRepository;
import com.example.TransManage.Repository.TranslationKeyRepository;
import com.example.TransManage.Repository.TranslationRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AiReviewServiceTest {
    private final TranslationRepository translationRepository = mock(TranslationRepository.class);
    private final TranslationKeyRepository translationKeyRepository = mock(TranslationKeyRepository.class);
    private final AiReviewHistoryRepository aiReviewHistoryRepository = mock(AiReviewHistoryRepository.class);
    private final RestClient.Builder restClientBuilder = mock(RestClient.Builder.class);
    private final RestClient restClient = mock(RestClient.class);

    private AiReviewService aiReviewService;

    @BeforeEach
    void setUp() {
        when(restClientBuilder.baseUrl(anyString())).thenReturn(restClientBuilder);
        when(restClientBuilder.build()).thenReturn(restClient);
        aiReviewService = new AiReviewService(
                translationRepository,
                translationKeyRepository,
                aiReviewHistoryRepository,
                restClientBuilder,
                new ObjectMapper(),
                "",
                "https://api.openai.com/v1",
                "gpt-4o-mini");
    }

    @Test
    void returnsLocalIssuesWhenAiProviderIsNotConfigured() {
        TranslationKey translationKey = translationKey("Hello {username}", 5);
        Translation translation = translation("Bonjour");
        when(translationRepository.findById(20L)).thenReturn(Optional.of(translation));
        when(translationKeyRepository.findById(30L)).thenReturn(Optional.of(translationKey));

        AiReviewResponse response = aiReviewService.reviewTranslation(1L, 2L, 30L, 20L);

        assertEquals(50, response.score());
        assertTrue(response.issues().contains("Translation exceeds the character limit"));
        assertTrue(response.issues().contains("Translation is missing one or more placeholders from the source text"));
        assertTrue(response.issues().contains("AI provider is not configured; only local checks were run"));
        assertEquals("Bonjour", response.suggestedText());
        assertEquals("REVIEW_REQUIRED", response.recommendation());
    }

    @Test
    void approvesValidTranslationWithoutCallingAiProvider() {
        TranslationKey translationKey = translationKey("Hello {username}", 30);
        Translation translation = translation("Bonjour {username}");
        when(translationRepository.findById(20L)).thenReturn(Optional.of(translation));
        when(translationKeyRepository.findById(30L)).thenReturn(Optional.of(translationKey));

        AiReviewResponse response = aiReviewService.reviewTranslation(1L, 2L, 30L, 20L);

        assertEquals(100, response.score());
        assertEquals("Bonjour {username}", response.suggestedText());
        assertEquals("REVIEW_REQUIRED", response.recommendation());
    }

    @Test
    void returnsLocalReviewWhenAiProviderFails() {
        RestClient.RequestBodyUriSpec request = mock(RestClient.RequestBodyUriSpec.class);
        when(restClient.post()).thenReturn(request);
        when(request.uri(anyString())).thenThrow(new RestClientException("AI provider unavailable"));
        aiReviewService = new AiReviewService(
                translationRepository,
                translationKeyRepository,
                aiReviewHistoryRepository,
                restClientBuilder,
                new ObjectMapper(),
                "test-key",
                "https://api.openai.com/v1",
                "gpt-4o-mini");

        TranslationKey translationKey = translationKey("Hello {username}", 30);
        Translation translation = translation("Bonjour {username}");
        when(translationRepository.findById(20L)).thenReturn(Optional.of(translation));
        when(translationKeyRepository.findById(30L)).thenReturn(Optional.of(translationKey));

        AiReviewResponse response = aiReviewService.reviewTranslation(1L, 2L, 30L, 20L);

        assertEquals(100, response.score());
        assertTrue(response.issues().contains("AI provider was unavailable; only local checks were run"));
        assertEquals("Bonjour {username}", response.suggestedText());
        assertEquals("REVIEW_REQUIRED", response.recommendation());
    }

    @Test
    void detectsStructurePreservationIssues() {
        TranslationKey translationKey = translationKey(
                "<b>Save 25% at https://example.com/{username}</b> {count, plural, one {item} other {items}}",
                200);
        Translation translation = translation("Guardar en example.com/usuario {total, plural, one {articulo} other {articulos}}");
        when(translationRepository.findById(20L)).thenReturn(Optional.of(translation));
        when(translationKeyRepository.findById(30L)).thenReturn(Optional.of(translationKey));

        AiReviewResponse response = aiReviewService.reviewTranslation(1L, 2L, 30L, 20L);

        assertTrue(response.issues().contains("Translation changes one or more ICU placeholders"));
        assertTrue(response.issues().contains("Translation does not preserve the source HTML tags"));
        assertTrue(response.issues().contains("Translation does not preserve the source URLs"));
        assertTrue(response.issues().contains("Translation does not preserve the source numbers"));
    }

    @Test
    void parsesValidFencedAiResponse() throws Exception {
        String providerContent = """
                ```json
                {"score":92,"issues":["Minor punctuation issue"],"suggestedText":"Bonjour {username}","recommendation":"REVIEW_REQUIRED"}
                ```
                """;
        configureAiResponse(providerContent);
        TranslationKey translationKey = translationKey("Hello {username}", 30);
        Translation translation = translation("Bonjour {username}");
        when(translationRepository.findById(20L)).thenReturn(Optional.of(translation));
        when(translationKeyRepository.findById(30L)).thenReturn(Optional.of(translationKey));

        AiReviewResponse response = aiReviewService.reviewTranslation(1L, 2L, 30L, 20L);

        assertEquals(92, response.score());
        assertTrue(response.issues().contains("Minor punctuation issue"));
        assertEquals("Bonjour {username}", response.suggestedText());
        assertEquals("REVIEW_REQUIRED", response.recommendation());
    }

    @Test
    void fallsBackWhenAiResponseIsMalformed() throws Exception {
        configureAiResponse("not valid json");
        TranslationKey translationKey = translationKey("Hello {username}", 30);
        Translation translation = translation("Bonjour {username}");
        when(translationRepository.findById(20L)).thenReturn(Optional.of(translation));
        when(translationKeyRepository.findById(30L)).thenReturn(Optional.of(translationKey));

        AiReviewResponse response = aiReviewService.reviewTranslation(1L, 2L, 30L, 20L);

        assertEquals(100, response.score());
        assertTrue(response.issues().contains("AI provider was unavailable; only local checks were run"));
        assertEquals("Bonjour {username}", response.suggestedText());
        assertEquals("REVIEW_REQUIRED", response.recommendation());
    }

    private void configureAiResponse(String content) throws Exception {
        RestClient aiRestClient = mock(RestClient.class);
        RestClient.RequestBodyUriSpec request = mock(RestClient.RequestBodyUriSpec.class);
        RestClient.RequestBodySpec bodySpec = mock(RestClient.RequestBodySpec.class);
        RestClient.ResponseSpec responseSpec = mock(RestClient.ResponseSpec.class);
        JsonNode response = new ObjectMapper().readTree("""
                {"choices":[{"message":{"content":%s}}]}
                """.formatted(new ObjectMapper().writeValueAsString(content)));
        when(aiRestClient.post()).thenReturn(request);
        when(request.uri(anyString())).thenReturn(bodySpec);
        when(bodySpec.header(anyString(), anyString())).thenReturn(bodySpec);
        when(bodySpec.contentType(any(MediaType.class))).thenReturn(bodySpec);
        when(bodySpec.body(any(Object.class))).thenReturn(bodySpec);
        when(bodySpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.body(JsonNode.class)).thenReturn(response);
        when(restClientBuilder.build()).thenReturn(aiRestClient);
        aiReviewService = new AiReviewService(
                translationRepository,
                translationKeyRepository,
            aiReviewHistoryRepository,
                restClientBuilder,
                new ObjectMapper(),
                "test-key",
                "https://api.openai.com/v1",
                "gpt-4o-mini");
    }

    private TranslationKey translationKey(String sourceText, int characterLimit) {
        TranslationKey translationKey = new TranslationKey();
        translationKey.setSourceText(sourceText);
        translationKey.setCharacterLimit(characterLimit);
        return translationKey;
    }

    private Translation translation(String translatedText) {
        Translation translation = new Translation();
        translation.setTranslatedText(translatedText);
        translation.setTargetLanguage("French");
        return translation;
    }
}