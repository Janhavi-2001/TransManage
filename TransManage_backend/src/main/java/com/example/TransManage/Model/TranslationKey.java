package com.example.TransManage.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "translation_keys")
public class TranslationKey {

    public enum KeyType {
        TEXT,
        BUTTON,
        TITLE,
        PLACEHOLDER
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(name = "page_id", nullable = false)
    private Long pageId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "page_id", insertable = false, updatable = false)
    private Page page;

    @Column(name = "project_id", nullable = false)
    private Long projectId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", insertable = false, updatable = false)
    private Project project;

    @Column(name = "trans_key", nullable = false, unique = true, columnDefinition = "VARCHAR(255) DEFAULT 'No Key'")
    private String transKey;

    @Column(name = "trans_key_name", nullable = false, columnDefinition = "VARCHAR(255) DEFAULT 'No Key Name'")
    private String transKeyName;

    @Column(name = "source_text", nullable = false, columnDefinition = "VARCHAR(255) DEFAULT 'No Source Text'")
    private String sourceText;

    @Column(name = "description", nullable = false, columnDefinition = "VARCHAR(255) DEFAULT 'No Description'")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "key_type", nullable = false, columnDefinition = "VARCHAR(50) DEFAULT 'TEXT'")
    private KeyType keyType;

    @Column(name = "is_required", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isRequired;

    @Column(name = "character_limit", nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    private Integer characterLimit;

    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Default constructor
    public TranslationKey() {}

    // Parameterized constructor
    public TranslationKey(Long id, Long pageId, Long projectId, String transKey, String transKeyName, String sourceText, String description, KeyType keyType, Boolean isRequired, Integer characterLimit, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.pageId = pageId;
        this.projectId = projectId;
        this.transKey = transKey;
        this.transKeyName = transKeyName;
        this.sourceText = sourceText;
        this.description = description;
        this.keyType = keyType;
        this.isRequired = isRequired;
        this.characterLimit = characterLimit;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getPageId() {
        return pageId;
    }
    public void setPageId(Long pageId) {
        this.pageId = pageId;
    }
    public Long getProjectId() {
        return projectId;
    }
    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }
    public String getTransKey() {
        return transKey;
    }
    public void setTransKey(String transKey) {
        this.transKey = transKey;
    }
    public String getTransKeyName() {
        return transKeyName;
    }
    public void setTransKeyName(String transKeyName) {
        this.transKeyName = transKeyName;
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
    public KeyType getKeyType() {
        return keyType;
    }
    public void setKeyType(KeyType keyType) {
        this.keyType = keyType;
    }
    public Boolean isRequired() {
        return isRequired;
    }
    public void setRequired(Boolean required) {
        isRequired = required;
    }
    public Integer getCharacterLimit() {
        return characterLimit;
    }
    public void setCharacterLimit(Integer characterLimit) {
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
