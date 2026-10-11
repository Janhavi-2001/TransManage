package com.example.TransManage.Repository;

import com.example.TransManage.Model.AiReviewHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AiReviewHistoryRepository extends JpaRepository<AiReviewHistory, Long> {
    List<AiReviewHistory> findByTranslationIdOrderByCreatedAtDesc(Long translationId);
    List<AiReviewHistory> findByPageIdOrderByCreatedAtDesc(Long pageId);
}
