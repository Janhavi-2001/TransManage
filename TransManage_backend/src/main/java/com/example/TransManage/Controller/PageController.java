package com.example.TransManage.Controller;

import com.example.TransManage.Model.Page;
import com.example.TransManage.Repository.PageRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects/{projectId}/pages")
@CrossOrigin(origins = "http://localhost:3000")

public class PageController {

    private final PageRepository pageRepository;

    public PageController(PageRepository pageRepository) {
        this.pageRepository = pageRepository;
    }


    // Test method to check if the controller is working
    @GetMapping("/test")
    public String test() {
        return "API is working";
    }

    // Method to get all projects
    @GetMapping
    public List<Page> getAllPages(@PathVariable Long projectId) {
        return pageRepository.findByProjectId(projectId);
    }

    // Method to create a new page
    @PostMapping
    public Page createPage(@PathVariable Long projectId, @RequestBody Page page) {
        page.setProjectId(projectId);
        if(page.getStatus() == null) {
            page.setStatus(Page.PageStatus.PENDING);
        }
        return pageRepository.save(page);
    }

    // Method to update an existing page
    @PutMapping("/{pageId}")
    public Page updatePage(@PathVariable Long pageId, @RequestBody Page incomingPage) {
        Page existingPage = pageRepository.findById(pageId)
            .orElseThrow(() -> new RuntimeException("Page not found"));

        existingPage.setName(incomingPage.getName());
        existingPage.setDescription(incomingPage.getDescription());
        existingPage.setContent(incomingPage.getContent());
        existingPage.setProjectId(incomingPage.getProjectId());

        if (incomingPage.getStatus() != null) {
            existingPage.setStatus(incomingPage.getStatus());
        }
        return pageRepository.save(existingPage);
    }

    // Method to delete a page by ID
    @DeleteMapping("/{pageId}")
    public void deletePage(@PathVariable Long pageId) {
        pageRepository.deleteById(pageId);
    }

    // Method to get a page by ID
    public Page getPageById(@PathVariable Long id) {
        Optional<Page> page = pageRepository.findById(id);
        return page.orElse(null);
    }
}
