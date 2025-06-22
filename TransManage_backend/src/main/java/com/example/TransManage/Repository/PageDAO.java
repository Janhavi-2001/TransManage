package com.example.TransManage.Repository;

import java.time.LocalDateTime;
import java.util.List;

import com.example.TransManage.Model.Page;
import com.example.TransManage.Service.Pages;
import org.springframework.stereotype.Repository;

@Repository
public class PageDAO {
    private static Pages pages = new Pages();

    static {
        // Initialize with some dummy data
        pages.getPages().add(new Page(1, "Home", 1, LocalDateTime.now(), LocalDateTime.now(), "active", "en"));
        pages.getPages().add(new Page(2, "About", 1, LocalDateTime.now(), LocalDateTime.now(), "active", "en"));
        pages.getPages().add(new Page(3, "Contact", 1, LocalDateTime.now(), LocalDateTime.now(), "inactive", "en"));
        pages.getPages().add(new Page(4, "Services", 2, LocalDateTime.now(), LocalDateTime.now(), "active", "fr"));
        pages.getPages().add(new Page(5, "Portfolio", 2, LocalDateTime.now(), LocalDateTime.now(), "inactive", "fr"));
    }

    // Method to get all pages
    public List<Page> getAllPages() {
        return pages.getPages();
    }

    // Method to find a page by ID
    public void createPage(Page page) {
        pages.getPages().add(page);
    }

    // Method to find a page by ID
    public boolean updatePage(Page updatedPage) {
        for (int i = 0; i < pages.getPages().size(); i++) {
            if (pages.getPages().get(i).getId() == updatedPage.getId()) {
                pages.getPages().set(i, updatedPage);
                return true;
            }
        }
        return false;
    }

    // Method to find a page by ID
    public Page findPageById(long id) {
        for (Page page : pages.getPages()) {
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
            pages.getPages().remove(page);
            return true;
        }
        return false;
    }
}
