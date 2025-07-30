package com.example.TransManage.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    public enum ProjectStatus {
        ACTIVE,
        COMPLETED,
        PENDING,
        ON_HOLD,
        CANCELLED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false, columnDefinition = "VARCHAR(255) DEFAULT 'No Name'")
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT DEFAULT 'No Description'")
    private String description;

    @Column(name = "base_language", nullable = false, columnDefinition = "VARCHAR(255) DEFAULT 'No Base Language'")
    private String baseLanguage;

    @Column(name = "target_languages", columnDefinition = "TEXT DEFAULT 'No Target Languages'")
    private String targetLanguages;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "VARCHAR(50) DEFAULT 'PENDING'")
    private ProjectStatus status;

    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Page> pages = new ArrayList<>();
    
    // Default Constructor
    public Project() {}

    // Parameterized Constructor
    public Project(Long id, String name, String description, String baseLanguage, String targetLanguages, ProjectStatus status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.baseLanguage = baseLanguage;
        this.targetLanguages = targetLanguages;
        this.status = status;
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
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getBaseLanguage() {
        return baseLanguage;
    }
    public void setBaseLanguage(String baseLanguage) {
        this.baseLanguage = baseLanguage;
    }
    public String getTargetLanguages() {
        return targetLanguages;
    }
    public void setTargetLanguages(String targetLanguages) {
        this.targetLanguages = targetLanguages;
    }
    public ProjectStatus getStatus() {
        return status;
    }
    public void setStatus(ProjectStatus status) {
        this.status = status;
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
    public List<Page> getPages() {
        return pages;
    }
    public void setPages(List<Page> pages) {
        this.pages = pages;
    }

    @Override
    public String toString() {
        return "ProjectModel [id=" + id + ", name=" + name +
                ", description=" + description + ", status=" + status +
                ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
    }
}
