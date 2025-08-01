package com.example.TransManage.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "translations")
public class Translation {

    public enum TranslationStatus {
        PENDING,
        IN_REVIEW,
        REJECTED,
        APPROVED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(name = "page_id", nullable = false)
    private Long pageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "page_id", insertable = false, updatable = false)
    private Page page;

    @Column(name = "project_id", nullable = false)
    private Long projectId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "project_id", insertable = false, updatable = false)
    private Project project;

    @Column(name = "translation_key_id", nullable = false)
    private Long translationKeyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "translation_key_id", insertable = false, updatable = false)
    private TranslationKey translationKey;

    @Column(name = "target_language", nullable = false, columnDefinition = "VARCHAR(50) DEFAULT 'No Target Languages'")
    private String targetLanguage;

    @Column(name = "translated_text", nullable = false, columnDefinition = "TEXT DEFAULT 'No Translated Text'")
    private String translatedText;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, columnDefinition = "VARCHAR(50) DEFAULT 'PENDING'")
    private TranslationStatus status;

    @Column(name = "notes", nullable = false, columnDefinition = "TEXT DEFAULT 'No Notes'")
    private String notes;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Default constructor with default values
    public Translation() {}

    // Parameterized constructor
    public Translation(Long id, Long projectId, Long pageId, Long translationKeyId, String targetLanguage, String translatedText, TranslationStatus status, String notes, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.projectId = projectId;
        this.pageId = pageId;
        this.translationKeyId = translationKeyId;
        this.targetLanguage = targetLanguage;
        this.translatedText = translatedText;
        this.status = status;
        this.notes = notes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and setters
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
    public Page getPage() {
        return page;
    }
    public void setPage(Page page) {
        this.page = page;
        this.pageId = page != null ? page.getId() : null;
    }
    public Long getProjectId() {
        return projectId;
    }
    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }
    public Project getProject() {
        return project;
    }
    public void setProject(Project project) {
        this.project = project;
        this.projectId = project != null ? project.getId() : null;
    }
    public Long getTranslationKeyId() {
        return translationKeyId;
    }
    public void setTranslationKeyId(Long translationKeyId) {
        this.translationKeyId = translationKeyId;
    }
    public TranslationKey getTranslationKey() {
        return translationKey;
    }
    public void setTranslationKey(TranslationKey translationKey) {
        this.translationKey = translationKey;
        this.translationKeyId = translationKey != null ? translationKey.getId() : null;
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
    public TranslationStatus getStatus() {
        return status;
    }
    public void setStatus(TranslationStatus status) {
        this.status = status;
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
