package com.example.TransManage.Model;

import java.time.LocalDateTime;

public class Translation {
    private long id;
    private long translationKeyId;
    private String targetLanguage;   // "es", "fr", "de", etc.
    private String translatedText;   // Actual translation
    private String status;           // "pending", "translated", "reviewed", "approved"
    private String translatorId;     // Who translated it
    private String notes;            // Translator/reviewer notes
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Getters and Setters
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public long getTranslationKeyId() {
        return translationKeyId;
    }
    public void setTranslationKeyId(long translationKeyId) {
        this.translationKeyId = translationKeyId;
    }
    public String getTargetLanguage() {
        return targetLanguage;
    }
    public void setTargetLanguage(String targetLanguage) {
        this.targetLanguage = targetLanguage;
    }
    public String getTranslatedText() {
        return translatedText;
    }
    public void setTranslatedText(String translatedText) {
        this.translatedText = translatedText;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getTranslatorId() {
        return translatorId;
    }
    public void setTranslatorId(String translatorId) {
        this.translatorId = translatorId;
    }
    public String getNotes() {
        return notes;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
