package com.example.TransManage.Controller;

import com.example.TransManage.Model.TranslationKey;
import com.example.TransManage.Repository.TranslationKeyRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects/{projectId}/pages/{pageId}/translation-keys")
@CrossOrigin(origins = "http://localhost:3000")

public class TranslationKeyController {

    private final TranslationKeyRepository translationKeyRepository;

    public TranslationKeyController(TranslationKeyRepository translationKeyRepository) {
        this.translationKeyRepository = translationKeyRepository;
    }

    // Test method to check if the controller is working
    @GetMapping("/test")
    public String test() {
        return "API is working";
    }

    // Method to get all translation keys
    @GetMapping
    public List<TranslationKey> getAllTranslationKeys(@PathVariable Long projectId, @PathVariable Long pageId) {
        return translationKeyRepository.findByPageId(pageId);
    }

    // Method to create a new translation key
    @PostMapping
    public TranslationKey createTranslationKey(@PathVariable Long projectId, @PathVariable Long pageId, @RequestBody TranslationKey translationKey) {
        translationKey.setPageId(pageId);
        translationKeyRepository.save(translationKey);
        return translationKey;
    }

    // Method to update an existing translation key
    @PutMapping("/{translationKeyId}")
    public TranslationKey updateTranslationKey(@PathVariable Long translationKeyId, @RequestBody TranslationKey translationKey) {
        translationKey.setId(translationKeyId);
        return translationKeyRepository.save(translationKey);
    }

    // Method to delete a translation key by ID
    @DeleteMapping("/{translationKeyId}")
    public void deleteTranslationKey(@PathVariable Long translationKeyId) {
        translationKeyRepository.deleteById(translationKeyId);
    }

    // Method to get a translation key by ID
    @GetMapping("/{translationKeyId}")
    public TranslationKey getTranslationKeyById(@PathVariable Long translationKeyId) {
        Optional<TranslationKey> translationKey = translationKeyRepository.findById(translationKeyId);
        return translationKey.orElse(null);
    }

}
