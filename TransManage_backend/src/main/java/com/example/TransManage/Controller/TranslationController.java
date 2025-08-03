package com.example.TransManage.Controller;

import com.example.TransManage.Model.Project;
import com.example.TransManage.Model.Translation;
import com.example.TransManage.Repository.TranslationRepository;
import com.example.TransManage.Repository.ProjectRepository;

import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects/{projectId}/pages/{pageId}/translation-keys/{translationKeyId}/translations")
@CrossOrigin(origins = "http://localhost:3000")

public class TranslationController {
    private final TranslationRepository translationRepository;
    private final ProjectRepository projectRepository;

    public TranslationController(TranslationRepository translationRepository, ProjectRepository projectRepository) {
        this.translationRepository = translationRepository;
        this.projectRepository = projectRepository;
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
        
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        if(translation.getTargetLanguage() == null || translation.getTargetLanguage().isEmpty()) {
            translation.setTargetLanguage("No Target Languages");
        }
        String[] allowedLanguages = project.getTargetLanguages().split(",");
        boolean isValidLanguage = Arrays.stream(allowedLanguages).map(String::trim).anyMatch(lang -> lang.equals(translation.getTargetLanguage()));
            
        if (!isValidLanguage) {
            throw new RuntimeException("Target language '" + translation.getTargetLanguage() + 
                "' is not allowed for this project. Allowed languages: " + project.getTargetLanguages());
        
        }
        if(translation.getStatus() == null) {
            translation.setStatus(Translation.TranslationStatus.PENDING);
        }

        translation.setProjectId(projectId);
        translation.setPageId(pageId);
        translation.setTranslationKeyId(translationKeyId);

        return translationRepository.save(translation);
    }

    // Method to update an existing translation
    @PutMapping("/{translationId}")
    public Translation updateTranslation(@PathVariable Long projectId, @PathVariable Long pageId, @PathVariable Long translationKeyId, @PathVariable Long translationId, @RequestBody Translation translation) {

        Translation existingTranslation = translationRepository.findById(translationId)
            .orElseThrow(() -> new RuntimeException("Translation not found"));

        existingTranslation.setTranslatedText(translation.getTranslatedText());
        existingTranslation.setStatus(translation.getStatus());
        existingTranslation.setNotes(translation.getNotes());

        existingTranslation.setProjectId(translation.getProjectId());
        existingTranslation.setPageId(translation.getPageId());
        existingTranslation.setTranslationKeyId(translation.getTranslationKeyId());

        return translationRepository.save(existingTranslation);
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
