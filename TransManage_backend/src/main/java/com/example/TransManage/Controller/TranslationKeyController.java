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
        translationKey.setProjectId(projectId);
        translationKey.setPageId(pageId);

        if(translationKey.getRequired() == null) {
            translationKey.setRequired(false);
        }
        
        if(translationKey.getCharacterLimit() == null) {
            translationKey.setCharacterLimit(1000);
        }
        
        if(translationKey.getTransKey() == null || translationKey.getTransKey().isEmpty()) {
            long keyCount = translationKeyRepository.countByPageId(pageId);
            long nextKeyNumber = keyCount + 1;
            
            String generatedKey = String.format("proj%d_page%d_key%d", 
                projectId, pageId, nextKeyNumber);
            
            translationKey.setTransKey(generatedKey);
        }
        
        return translationKeyRepository.save(translationKey);
    }

    // Method to update an existing translation key
    @PutMapping("/{translationKeyId}")
    public TranslationKey updateTranslationKey(@PathVariable Long translationKeyId, @RequestBody TranslationKey translationKey) {
        TranslationKey existingTranslationKey = translationKeyRepository.findById(translationKeyId)
            .orElseThrow(() -> new RuntimeException("Translation Key not found"));

        existingTranslationKey.setTransKeyName(translationKey.getTransKeyName());
        existingTranslationKey.setSourceText(translationKey.getSourceText());
        existingTranslationKey.setDescription(translationKey.getDescription());
        existingTranslationKey.setKeyType(translationKey.getKeyType());
        
        if (translationKey.getRequired() != null) {
            existingTranslationKey.setRequired(translationKey.getRequired());
        }

        if (translationKey.getCharacterLimit() != null) {
            existingTranslationKey.setCharacterLimit(translationKey.getCharacterLimit());
        }
        
        existingTranslationKey.setProjectId(translationKey.getProjectId());
        existingTranslationKey.setPageId(translationKey.getPageId());

        return translationKeyRepository.save(existingTranslationKey);
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
