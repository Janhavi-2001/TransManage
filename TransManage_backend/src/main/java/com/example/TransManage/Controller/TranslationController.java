package com.example.TransManage.Controller;

import com.example.TransManage.Model.Translation;
import com.example.TransManage.Repository.TranslationRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects/{projectId}/pages/{pageId}/translation-keys/{translationKeyId}/translations")
@CrossOrigin(origins = "http://localhost:3000")

public class TranslationController {

    private final TranslationRepository translationRepository;

    public TranslationController(TranslationRepository translationRepository) {
        this.translationRepository = translationRepository;
    }

    // Test method to check if the controller is working
    @GetMapping("/test")
    public String test() {
        return "Translation API is working";
    }

    // Method to get all translations for a translation key
    @GetMapping
    public List<Translation> getAllTranslations(@PathVariable Long projectId, @PathVariable Long pageId, @PathVariable Long translationKeyId) {
        return translationRepository.findByTranslationKeyId(translationKeyId);
    }

    // Method to create a new translation
    @PostMapping
    public Translation createTranslation(@PathVariable Long projectId, @PathVariable Long pageId, @PathVariable Long translationKeyId, @RequestBody Translation translation) {
        translation.setTranslationKeyId(translationKeyId);
        translationRepository.save(translation);
        return translation;
    }

    // Method to update an existing translation
    @PutMapping("/{translationId}")
    public Translation updateTranslation(@PathVariable Long projectId, @PathVariable Long pageId, @PathVariable Long translationKeyId, @PathVariable Long translationId, @RequestBody Translation translation) {
        translation.setId(translationId);
        translation.setTranslationKeyId(translationKeyId);
        return translationRepository.save(translation);
    }

    // Method to delete a translation by ID
    @DeleteMapping("/{translationId}")
    public void deleteTranslation(@PathVariable Long projectId, @PathVariable Long pageId, @PathVariable Long translationKeyId, @PathVariable Long translationId) {
        translationRepository.deleteById(translationId);
    }

    // Method to get a specific translation by ID
    @GetMapping("/{translationId}")
    public Translation getTranslationById(@PathVariable Long translationId) {
        Optional<Translation> translation = translationRepository.findById(translationId);
        return translation.orElse(null);
    }
}
