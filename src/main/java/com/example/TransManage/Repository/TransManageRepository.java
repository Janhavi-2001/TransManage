package com.example.TransManage.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.TransManage.Model.TransManageModel;

public interface TransManageRepository extends JpaRepository<TransManageModel, Long> 
{
    List<TransManageModel> findByLanguage(String language); // Custom query method
}

