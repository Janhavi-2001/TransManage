package com.example.TransManage.Service;

import java.util.ArrayList;
import java.util.List;

import com.example.TransManage.Model.Translation;

public class Translations {
    private List<Translation> translationList;

    // Get the translation list (initialize if null)
    public List<Translation> getTranslationList() {
        if (translationList == null) {
            translationList = new ArrayList<>();
        }
        return translationList;
    }

    public void setTranslationList(List<Translation> translationList) {
        this.translationList = translationList;
    }
}
