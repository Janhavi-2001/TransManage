package com.example.TransManage.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.example.TransManage.Model.Page;
import com.example.TransManage.Service.Pages;
import org.springframework.stereotype.Repository;

@Repository
public class PageDAO {
    private static Pages pages = new Pages();

    static {
        // Initialize with some dummy data
        // Constructor: (id, name, title, description, content, projectId, createdAt, updatedAt, status, language)
        pages.getPageList().add(new Page(1, "Home Page", "Main landing page", "Welcome to our website. This is the home page content.", 1, LocalDateTime.now(), LocalDateTime.now(), "Active", "en"));
        pages.getPageList().add(new Page(2, "About Us", "Information about the company", "Learn more about our company, mission, and values.", 1, LocalDateTime.now(), LocalDateTime.now(), "Active", "en"));
        pages.getPageList().add(new Page(3, "Contact Us", "Contact information and form", "Get in touch with us using the contact form below.", 1, LocalDateTime.now(), LocalDateTime.now(), "Pending", "en"));
        pages.getPageList().add(new Page(4, "Our Services", "List of services offered", "We offer a wide range of professional services.", 2, LocalDateTime.now(), LocalDateTime.now(), "Active", "en"));
    }

    // Method to get all pages
    public List<Page> getPagesByProjectId(Long projectId) {
    return pages.getPageList().stream()
            .filter(page -> page.getProjectId() == projectId)
            .collect(Collectors.toList());
    }

    // Method to create a new page
    public void createPage(Page page) {
        pages.getPageList().add(page);
    }

    // Method to update an existing page
    public boolean updatePage(Page updatedPage) {
        for (int i = 0; i < pages.getPageList().size(); i++) {
            if (pages.getPageList().get(i).getId() == updatedPage.getId()) {
                updatedPage.setUpdatedAt(LocalDateTime.now());
                pages.getPageList().set(i, updatedPage);
                return true;
            }
        }
        return false;
    }

    // Method to find a page by ID
    public Page findPageById(long id) {
        for (Page page : pages.getPageList()) {
            if (page.getId() == id) {
                return page;
            }
        }
        return null;
    }

    // Method to remove a page by ID
    public boolean removePageById(long id) {
        Page page = findPageById(id);
        if (page != null) {
            pages.getPageList().remove(page);
            return true;
        }
        return false;
    }
}
