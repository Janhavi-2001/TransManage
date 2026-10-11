package com.example.TransManage.Controller;

import com.example.TransManage.Model.AiBatchReviewItem;
import com.example.TransManage.Service.AiReviewService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/projects/{projectId}/pages/{pageId}")
@CrossOrigin(origins = "http://localhost:3000")
public class PageAiReviewController {
    private final AiReviewService aiReviewService;

    public PageAiReviewController(AiReviewService aiReviewService) {
        this.aiReviewService = aiReviewService;
    }

    @PostMapping("/ai-review")
    public List<AiBatchReviewItem> reviewPage(
            @PathVariable Long projectId,
            @PathVariable Long pageId) {
        return aiReviewService.reviewPage(projectId, pageId);
    }
}