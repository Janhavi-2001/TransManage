package com.example.TransManage.Model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;


@Entity
public class TransManageModel {
    
    // This class will represent the translation management model
    // It can include fields for translation keys, values, and any other relevant metadata

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "`key`")
    private String key;

    @Column(name = "`value`")
    private String value;

    @Column(name = "`language`")
    private String language;

    @Column(name = "`created_by`")
    private String createdBy;

    @Column(name = "`created_at`")
    private Date createdAt;

    @Column(name = "`updated_by`")
    private String updatedBy;

    @Column(name = "`updated_at`")
    private Date updatedAt;

    @Column(name = "`status`")
    private String status;

    @Column(name = "`description`")
    private String description;

    @Column(name = "`category`")
    private String category;

    @Column(name = "`tags`")
    private String tags;

    @Column(name = "`version`")
    private String version;

    @Column(name = "`notes`")
    private String notes;

    @Column(name = "`priority`")
    private String priority;

    @Column(name = "`last_accessed`")
    private Date lastAccessed;


    // Getters and Setters for the fields
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getKey() {
        return key;
    }
    public void setKey(String key) {
        this.key = key;
    }
    public String getValue() {
        return value;
    }
    public void setValue(String value) {
        this.value = value;
    }
    public String getLanguage() {
        return language;
    }
    public void setLanguage(String language) {
        this.language = language;
    }
    public String getCreatedBy() {
        return createdBy;
    }
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
    public Date getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
    public String getUpdatedBy() {
        return updatedBy;
    }
    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }
    public Date getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public String getTags() {
        return tags;
    }
    public void setTags(String tags) {
        this.tags = tags;
    }
    public String getVersion() {
        return version;
    }
    public void setVersion(String version) {
        this.version = version;
    }
    public String getNotes() {
        return notes;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }
    public String getPriority() {
        return priority;
    }
    public void setPriority(String priority) {
        this.priority = priority;
    }
    public Date getLastAccessed() {
        return lastAccessed;
    }
    public void setLastAccessed(Date lastAccessed) {
        this.lastAccessed = lastAccessed;
    }
}
