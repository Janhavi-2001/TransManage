package com.example.TransManage.Controller;

import com.example.TransManage.Model.Page;
import com.example.TransManage.Repository.PageDAO;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects/{projectId}/pages")
@CrossOrigin(origins = "http://localhost:3000")

public class PageController {

    private final PageDAO pageDAO;

    public PageController(PageDAO pageDAO) {
        this.pageDAO = pageDAO;
    }


    // Test method to check if the controller is working
    @GetMapping("/test")
    public String test() {
        return "API is working";
    }

    // Method to get all projects
    @GetMapping
    public List<Page> getAllPages(@PathVariable Long projectId) {
        return pageDAO.getPagesByProjectId(projectId);
    }

    // Method to create a new page
    @PostMapping
    public Page createPage(@PathVariable Long projectId, @RequestBody Page page) {
        page.setProjectId(projectId);
        pageDAO.createPage(page);
        return page;
    }

    // Method to update an existing page
    @PutMapping("/{pageId}")
    public boolean updatePage(@PathVariable Long pageId, @RequestBody Page page) {
        page.setId(pageId);
        return pageDAO.updatePage(page);
    }

    // Method to delete a page by ID
    @DeleteMapping("/{pageId}")
    public boolean deletePage(@PathVariable Long pageId) {
        return pageDAO.removePageById(pageId);
    }
}
