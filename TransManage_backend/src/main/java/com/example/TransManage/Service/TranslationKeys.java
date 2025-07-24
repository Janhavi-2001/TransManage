package com.example.TransManage.Service;

import java.util.ArrayList;
import java.util.List;

import com.example.TransManage.Model.TranslationKey;

import jakarta.persistence.OneToMany;

// Storage class for translation keys
public class TranslationKeys {
    @OneToMany(mappedBy = "pageId")
    private List<TranslationKey> translationKeyList;

    // Get the translation key list (initialize if null)
    public List<TranslationKey> getTranslationKeyList() {
        if (translationKeyList == null) {
            translationKeyList = new ArrayList<>();
        }
        return translationKeyList;
    }

    public void setTranslationKeyList(List<TranslationKey> translationKeyList) {
        this.translationKeyList = translationKeyList;
    }
}