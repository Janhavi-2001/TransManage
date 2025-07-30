package com.example.TransManage.Repository;

import com.example.TransManage.Model.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PageRepository extends JpaRepository<Page, Long> {
    List<Page> findByProjectId(Long projectId);
}
