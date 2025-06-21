package com.example.TransManage.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.example.TransManage.Model.Project;
import com.example.TransManage.Service.Projects;
import org.springframework.stereotype.Repository;

@Repository
public class ProjectDAO {

    private static Projects projects = new Projects();

    static {
        projects.getProjectList().add(new Project(1L, "Project A", "Description A", "English", "Hindi, Japanese", "Active", LocalDateTime.now(), LocalDateTime.now().plusDays(30)));
        projects.getProjectList().add(new Project(2L, "Project B", "Description B", "English", "Spanish", "Completed", LocalDateTime.now().minusDays(10), LocalDateTime.now()));
        projects.getProjectList().add(new Project(3L, "Project C", "Description C", "English", "French", "Pending", LocalDateTime.now().plusDays(5), LocalDateTime.now().plusDays(35)));
        projects.getProjectList().add(new Project(4L, "Project D", "Description D", "English", "German, Italian", "Active", LocalDateTime.now(), LocalDateTime.now().plusDays(15)));
        projects.getProjectList().add(new Project(5L, "Project E", "Description E", "English", "Chinese", "On Hold", LocalDateTime.now().minusDays(5), LocalDateTime.now().plusDays(10)));
    }


    // Method to get all projects
    public List<Project> getAllProjects() {
        return new ArrayList<>(projects.getProjectList());
    }

    // Method to create a new project
    public void createProject(Project project) {
        projects.getProjectList().add(project);
    }

    // Method to update a project
    public boolean updateProject(Project updatedProject) {
        for (int i = 0; i < projects.getProjectList().size(); i++) {
            if (projects.getProjectList().get(i).getId().equals(updatedProject.getId())) {
                projects.getProjectList().set(i, updatedProject);
                return true;
            }
        }
        return false;
    }


    // Method to find a project by ID
    public Project findProjectById(Long id) {
        for (Project project : projects.getProjectList()) {
            if (project.getId().equals(id)) {
                return project;
            }
        }
        return null;
    }

    // Method to remove a project by ID
    public boolean removeProjectById(Long id) {
        Project project = findProjectById(id);
        if (project != null) {
            projects.getProjectList().remove(project);
            return true;
        }
        return false;
    }
}
