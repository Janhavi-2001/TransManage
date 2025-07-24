package com.example.TransManage.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.example.TransManage.Model.Translation;
import com.example.TransManage.Service.Translations;

@Repository
public class TranslationDAO {
    private static Translations translations = new Translations();

    static {
        translations.getTranslationList().add(new Translation(1L, 1, "hi", "humare application ka swagat hai", "in review", 1001L, "Change", LocalDateTime.now(), LocalDateTime.now()));
        translations.getTranslationList().add(new Translation(2L, 2, "ja", "アプリケーションをご利用いただきありがとうございます。", "approved", 1002L, "Sounds Good." ,LocalDateTime.now(), LocalDateTime.now()));
    }

    // Method to get all translations by key ID
    public List<Translation> getTranslationsByKeyId(Long keyId) {
        return translations.getTranslationList().stream()
                .filter(t -> t.getTranslationKeyId() == keyId)
                .collect(Collectors.toList());
    }

    // Method to create a new translation
    public void createTranslation(Translation translation) {
        translations.getTranslationList().add(translation);
    }

    // Method to update an existing translation
    public boolean updateTranslation(Translation updatedTranslation) {
        for (int i = 0; i < translations.getTranslationList().size(); i++) {
            if (translations.getTranslationList().get(i).getId() == updatedTranslation.getId()) {
                translations.getTranslationList().set(i, updatedTranslation);
                return true;
            }
        }
        return false;
    }

    // Method to find a translation by ID
    public Translation findTranslationById(Long id) {
        for (Translation translation : translations.getTranslationList()) {
            if (translation.getId() == id) {
                return translation;
            }
        }
        return null;
    }

    // Method to remove a translation by ID
    public boolean removeTranslationById(Long id) {
        Translation translation = findTranslationById(id);
        if (translation != null) {
            translations.getTranslationList().remove(translation);
            return true;
        }
        return false;
    }
}
