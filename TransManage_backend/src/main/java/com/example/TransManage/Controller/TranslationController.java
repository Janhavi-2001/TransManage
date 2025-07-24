package com.example.TransManage.Controller;

import com.example.TransManage.Model.Translation;
import com.example.TransManage.Repository.TranslationDAO;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects/{projectId}/pages/{pageId}/translation-keys/{translationKeyId}/translations")
@CrossOrigin(origins = "http://localhost:3000")

public class TranslationController {
    
    private final TranslationDAO translationDAO;

    public TranslationController(TranslationDAO translationDAO) {
        this.translationDAO = translationDAO;
    }

    // Test method to check if the controller is working
    @GetMapping("/test")
    public String test() {
        return "Translation API is working";
    }

    // Method to get all translations for a translation key
    @GetMapping
    public List<Translation> getAllTranslations(@PathVariable Long projectId, @PathVariable Long pageId, @PathVariable Long translationKeyId) {
        return translationDAO.getTranslationsByKeyId(translationKeyId);
    }

    // Method to create a new translation
    @PostMapping
    public Translation createTranslation(@PathVariable Long projectId, @PathVariable Long pageId, @PathVariable Long translationKeyId, @RequestBody Translation translation) {
        translation.setTranslationKeyId(translationKeyId);
        translationDAO.createTranslation(translation);
        return translation;
    }

    // Method to update an existing translation
    @PutMapping("/{translationId}")
    public boolean updateTranslation(@PathVariable Long projectId, @PathVariable Long pageId, @PathVariable Long translationKeyId, @PathVariable Long translationId, @RequestBody Translation translation) {
        translation.setId(translationId);
        translation.setTranslationKeyId(translationKeyId);
        return translationDAO.updateTranslation(translation);
    }

    // Method to delete a translation by ID
    @DeleteMapping("/{translationId}")
    public boolean deleteTranslation(@PathVariable Long projectId, @PathVariable Long pageId, @PathVariable Long translationKeyId, @PathVariable Long translationId) {
        return translationDAO.removeTranslationById(translationId);
    }

    // Method to get a specific translation by ID
    @GetMapping("/{translationId}")
    public Translation getTranslationById(@PathVariable Long projectId, @PathVariable Long pageId, @PathVariable Long translationKeyId, @PathVariable Long translationId) {
        return translationDAO.findTranslationById(translationId);
    }
}
