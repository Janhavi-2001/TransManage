package com.example.TransManage.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.example.TransManage.Model.TranslationKey;
import com.example.TransManage.Service.TranslationKeys;

@Repository
public class TranslationKeyDAO {
    private static TranslationKeys translationKeys = new TranslationKeys();

    static {
        translationKeys.getTranslationKeyList().add(new TranslationKey(1L, 1, 1, "proj1_page1_key1", "welcome_message", "Welcome to our application!", "desc", "title", true, 50, LocalDateTime.now(), LocalDateTime.now()));
        translationKeys.getTranslationKeyList().add(new TranslationKey(2L, 1, 1, "proj1_page1_key2", "goodbye_message", "Thank you for using our application!", "desc", "title", true, 50, LocalDateTime.now(), LocalDateTime.now()));
        translationKeys.getTranslationKeyList().add(new TranslationKey(3L, 1, 1, "proj1_page1_key3", "error_message", "An error has occurred. Please try again later.", "desc", "text", true, 50, LocalDateTime.now(), LocalDateTime.now()));
        translationKeys.getTranslationKeyList().add(new TranslationKey(4L, 2, 1, "proj1_page2_key1", "success_message", "Your operation was successful!", "desc", "text", true, 50, LocalDateTime.now(), LocalDateTime.now()));
        translationKeys.getTranslationKeyList().add(new TranslationKey(5L, 2, 1, "proj1_page2_key2", "loading_message", "Loading, please wait...", "desc", "text", true, 50, LocalDateTime.now(), LocalDateTime.now()));
    }


    // Method to get all translation keys
    public List<TranslationKey> getTranslationKeysByPageId(Long pageId) {
    return translationKeys.getTranslationKeyList().stream()
            .filter(key -> key.getPageId() == pageId)
            .collect(Collectors.toList());
    }

    // Method to create a new translation key
    public void createTranslationKey(TranslationKey translationKey) {
        translationKeys.getTranslationKeyList().add(translationKey);
    }

    // Method to update a translation key
    public boolean updateTranslationKey(TranslationKey updatedTranslationKey) {
        for (int i = 0; i < translationKeys.getTranslationKeyList().size(); i++) {
            if (translationKeys.getTranslationKeyList().get(i).getId() == updatedTranslationKey.getId()) {
                translationKeys.getTranslationKeyList().set(i, updatedTranslationKey);
                return true;
            }
        }
        return false;
    }


    // Method to find a translation key by ID
    public TranslationKey findTranslationKeyById(Long id) {
        for (TranslationKey translationKey : translationKeys.getTranslationKeyList()) {
            if (translationKey.getId() == id) {
                return translationKey;
            }
        }
        return null;
    }

    // Method to remove a translation key by ID
    public boolean removeTranslationKeyById(Long id) {
        TranslationKey translationKey = findTranslationKeyById(id);
        if (translationKey != null) {
            translationKeys.getTranslationKeyList().remove(translationKey);
            return true;
        }
        return false;
    }
}
