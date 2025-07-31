package com.example.TransManage.Repository;

import com.example.TransManage.Model.TranslationKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TranslationKeyRepository extends JpaRepository<TranslationKey, Long> {
    List<TranslationKey> findByPageId(Long pageId);
}
