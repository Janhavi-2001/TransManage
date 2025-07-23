package com.example.TransManage.Model;

import java.time.LocalDateTime;

public class Page {
    private long id;
    private String name;
    private String description;
    private String content;     // Assuming content is a String, can be changed to another type if needed
    private long projectId;
    private String status;
    private String language;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Default constructor
    public Page() {}

    // Parameterized constructor
    public Page(long id, String name, String description, String content, long projectId, LocalDateTime createdAt, LocalDateTime updatedAt, String status, String language) 
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.content = content;
        this.projectId = projectId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.language = language;
    }

    // Getters and Setters
    public long getId() {
        return id;
    }
    public void setId(long id) {
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
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public long getProjectId() {
        return projectId;
    }
    public void setProjectId(long projectId) {
        this.projectId = projectId;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getLanguage() {
        return language;
    }
    public void setLanguage(String language) {
        this.language = language;
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
