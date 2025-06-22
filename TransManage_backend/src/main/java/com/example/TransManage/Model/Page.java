package com.example.TransManage.Model;

import java.time.LocalDateTime;

public class Page {
    private long id;
    private String name;
    private long projectId;
    private String status;
    private String language;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Default constructor
    public Page() {}

    // Parameterized constructor
    public Page(long id, String name, long projectId, LocalDateTime createdAt, LocalDateTime updatedAt, String status, String language) {
        this.id = id;
        this.name = name;
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
