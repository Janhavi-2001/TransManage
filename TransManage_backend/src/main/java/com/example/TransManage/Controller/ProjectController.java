package com.example.TransManage.Controller;

import com.example.TransManage.Model.Project;
import com.example.TransManage.Repository.ProjectRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000")

public class ProjectController {
    private ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }
    

    // Test method to check if the controller is working
    @GetMapping("/test")
    public String test() {
        return "API is working";
    }

    // Method to get all projects
    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Method to create a new project
    @PostMapping
    public Project createProject(@RequestBody Project project) {
        if(project.getStatus() == null) {
            project.setStatus(Project.ProjectStatus.PENDING);
        }
        return projectRepository.save(project);
    }

    // Method to update an existing project
    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id, @RequestBody Project incomingProject) {
        Project existingProject = projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Project not found"));

        existingProject.setName(incomingProject.getName());
        existingProject.setDescription(incomingProject.getDescription());
        existingProject.setBaseLanguage(incomingProject.getBaseLanguage());
        existingProject.setTargetLanguages(incomingProject.getTargetLanguages());

        if (incomingProject.getStatus() != null) {
            existingProject.setStatus(incomingProject.getStatus());
        }
        return projectRepository.save(existingProject);
    }

    // Method to delete a project by ID
    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectRepository.deleteById(id);
    }

    // Method to get a project by ID
    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id) {
        Optional<Project> project = projectRepository.findById(id);
        return project.orElse(null);
    }
}
