package com.example.TransManage.Service;

import java.util.ArrayList;
import java.util.List;

import com.example.TransManage.Model.Page;

import jakarta.persistence.OneToMany;

public class Pages {

    @OneToMany(mappedBy = "projectId")
    private List<Page> pageList;

    // Get the list of pages
    public List<Page> getPages() {
        if (pageList == null) {
            pageList = new ArrayList<>();
        }
        return pageList;
    }

    public void setPageList(List<Page> pageList) {
        this.pageList = pageList;
    }
}
