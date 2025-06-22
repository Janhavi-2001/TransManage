package com.example.TransManage.Controller;

import com.example.TransManage.Model.Page;
import com.example.TransManage.Repository.PageDAO;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/pages")
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
    public List<Page> getAllPages() {
        return pageDAO.getAllPages();
    }

    // Method to create a new page
    @PostMapping
    public void createPage(@RequestBody Page page) {
        pageDAO.createPage(page);
    }

    // Method to update an existing page
    @PutMapping("/{id}")
    public boolean updatePage(@PathVariable Long id, @RequestBody Page page) {
        page.setId(id);
        return pageDAO.updatePage(page);
    }

    // Method to delete a page by ID
    @DeleteMapping("/{id}")
    public boolean deletePage(@PathVariable Long id) {
        return pageDAO.removePageById(id);
    }

}
