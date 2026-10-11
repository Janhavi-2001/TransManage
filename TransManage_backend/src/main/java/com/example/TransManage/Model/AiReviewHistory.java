package com.example.TransManage.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "ai_review_history")
public class AiReviewHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_id", nullable = false)
    private Long projectId;

    @Column(name = "page_id", nullable = false)
    private Long pageId;

    @Column(name = "translation_key_id", nullable = false)
    private Long translationKeyId;

    @Column(name = "translation_id", nullable = false)
    private Long translationId;

    @Column(nullable = false)
    private int score;

    @Column(name = "issues_json", nullable = false, columnDefinition = "TEXT")
    private String issuesJson;

    @Column(name = "suggested_text", columnDefinition = "TEXT")
    private String suggestedText;

    @Column(nullable = false, columnDefinition = "VARCHAR(50)")
    private String recommendation;

    @Column(name = "ai_model", nullable = false, columnDefinition = "VARCHAR(255)")
    private String aiModel;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public AiReviewHistory() {
    }

    public AiReviewHistory(
            Long projectId,
            Long pageId,
            Long translationKeyId,
            Long translationId,
            int score,
            String issuesJson,
            String suggestedText,
            String recommendation,
            String aiModel) {
        this.projectId = projectId;
        this.pageId = pageId;
        this.translationKeyId = translationKeyId;
        this.translationId = translationId;
        this.score = score;
        this.issuesJson = issuesJson;
        this.suggestedText = suggestedText;
        this.recommendation = recommendation;
        this.aiModel = aiModel;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public Long getProjectId() {
        return projectId;
    }

    public Long getPageId() {
        return pageId;
    }

    public Long getTranslationKeyId() {
        return translationKeyId;
    }

    public Long getTranslationId() {
        return translationId;
    }

    public int getScore() {
        return score;
    }

    public String getIssuesJson() {
        return issuesJson;
    }

    public String getSuggestedText() {
        return suggestedText;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public String getAiModel() {
        return aiModel;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
