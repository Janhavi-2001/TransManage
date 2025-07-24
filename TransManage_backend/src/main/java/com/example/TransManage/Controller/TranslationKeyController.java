package com.example.TransManage.Controller;

import com.example.TransManage.Model.TranslationKey;
import com.example.TransManage.Repository.TranslationKeyDAO;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects/{projectId}/pages/{pageId}/translation-keys")
@CrossOrigin(origins = "http://localhost:3000")

public class TranslationKeyController {
    
    private final TranslationKeyDAO translationKeyDAO;

    public TranslationKeyController(TranslationKeyDAO translationKeyDAO) {
        this.translationKeyDAO = translationKeyDAO;
    }

    // Test method to check if the controller is working
    @GetMapping("/test")
    public String test() {
        return "API is working";
    }

    // Method to get all translation keys
    @GetMapping
    public List<TranslationKey> getAllTranslationKeys(@PathVariable Long projectId, @PathVariable Long pageId) {
        return translationKeyDAO.getTranslationKeysByPageId(pageId);
    }

    // Method to create a new translation key
    @PostMapping
    public TranslationKey createTranslationKey(@PathVariable Long projectId, @PathVariable Long pageId, @RequestBody TranslationKey translationKey) {
        translationKey.setPageId(pageId);
        translationKeyDAO.createTranslationKey(translationKey);
        return translationKey;
    }

    // Method to update an existing translation key
    @PutMapping("/{translationKeyId}")
    public boolean updateTranslationKey(@PathVariable Long translationKeyId, @RequestBody TranslationKey translationKey) {
        translationKey.setId(translationKeyId);
        return translationKeyDAO.updateTranslationKey(translationKey);
    }

    // Method to delete a translation key by ID
    @DeleteMapping("/{translationKeyId}")
    public boolean deleteTranslationKey(@PathVariable Long translationKeyId) {
        return translationKeyDAO.removeTranslationKeyById(translationKeyId);
    }

}
