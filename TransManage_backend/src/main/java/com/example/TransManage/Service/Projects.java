package com.example.TransManage.Service;

import java.util.ArrayList;
import java.util.List;

import com.example.TransManage.Model.Project;

// Storage class for projects
public class Projects {
    private List<Project> projectList;

    // Get the project list (initialize if null)
    public List<Project> getProjectList() {
        if (projectList == null) {
            projectList = new ArrayList<>();
        }
        return projectList;
    }

    public void setProjectList(List<Project> projectList) {
        this.projectList = projectList;
    }
}
