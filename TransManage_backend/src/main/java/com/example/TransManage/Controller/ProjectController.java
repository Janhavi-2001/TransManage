package com.example.TransManage.Controller;

import com.example.TransManage.Model.Project;
import com.example.TransManage.Repository.ProjectDAO;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000")

public class ProjectController {
    private ProjectDAO projectDAO;

    public ProjectController(ProjectDAO projectDAO) {
        this.projectDAO = projectDAO;
    }
    

    // Test method to check if the controller is working
    @GetMapping("/test")
    public String test() {
        return "API is working";
    }

    // Method to get all projects
    @GetMapping
    public List<Project> getAllProjects() {
        return projectDAO.getAllProjects();
    }

    // Method to create a new project
    @PostMapping
    public void createProject(@RequestBody Project project) {
        projectDAO.createProject(project);
    }

    // Method to update an existing project
    @PutMapping("/{id}")
    public boolean updateProject(@PathVariable Long id, @RequestBody Project project) {
        project.setId(id);
        return projectDAO.updateProject(project);
    }

    // Method to delete a project by ID
    @DeleteMapping("/{id}")
    public boolean deleteProject(@PathVariable Long id) {
        return projectDAO.removeProjectById(id);
    }
}
