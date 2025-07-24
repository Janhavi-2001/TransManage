package com.example.TransManage.Model;

import java.time.LocalDateTime;

public class TranslationKey {
    private long id;
    private long pageId;
    private long projectId;          // Project identifier
    private String key;              // Unique identifier for the translation key
    private String keyName;          // e.g., "header.title", "button.submit"
    private String sourceText;       // Original text in base language
    private String description;      // Context for translators
    private String keyType;          // "text", "button", "title", "placeholder", etc.
    private boolean isRequired;      // Critical translations
    private int characterLimit;      // Max characters for UI constraints
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Default constructor
    public TranslationKey() {}

    // Parameterized constructor
    public TranslationKey(long id, long pageId, long projectId, String key, String keyName, String sourceText, String description, String keyType, boolean isRequired, int characterLimit, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.pageId = pageId;
        this.projectId = projectId;
        this.key = key;
        this.keyName = keyName;
        this.sourceText = sourceText;
        this.description = description;
        this.keyType = keyType;
        this.isRequired = isRequired;
        this.characterLimit = characterLimit;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public long getPageId() {
        return pageId;
    }
    public void setPageId(long pageId) {
        this.pageId = pageId;
    }
    public long getProjectId() {
        return projectId;
    }
    public void setProjectId(long projectId) {
        this.projectId = projectId;
    }
    public String getKey() {
        return key;
    }
    public void setKey(String key) {
        this.key = key;
    }
    public String getKeyName() {
        return keyName;
    }
    public void setKeyName(String keyName) {
        this.keyName = keyName;
    }
    public String getSourceText() {
        return sourceText;
    }
    public void setSourceText(String sourceText) {
        this.sourceText = sourceText;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getKeyType() {
        return keyType;
    }
    public void setKeyType(String keyType) {
        this.keyType = keyType;
    }
    public boolean isRequired() {
        return isRequired;
    }
    public void setRequired(boolean required) {
        isRequired = required;
    }
    public int getCharacterLimit() {
        return characterLimit;
    }
    public void setCharacterLimit(int characterLimit) {
        this.characterLimit = characterLimit;
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
