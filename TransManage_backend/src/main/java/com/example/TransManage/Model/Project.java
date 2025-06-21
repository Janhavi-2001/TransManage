package com.example.TransManage.Model;

import java.time.LocalDateTime;

public class Project {

    // Fields representing project attributes
    private Long id;
    private String name;
    private String description;
    private String baseLanguage;
    private String targetLanguages;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Default Constructor
    public Project() {}

    // Parameterized Constructor
    public Project(Long id, String name, String description, String baseLanguage, String targetLanguages, String status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.baseLanguage = baseLanguage;
        this.targetLanguages = targetLanguages;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
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

    @Override
    public String toString() {
        return "ProjectModel [id=" + id + ", name=" + name +
                ", description=" + description + ", status=" + status +
                ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
    }
}
