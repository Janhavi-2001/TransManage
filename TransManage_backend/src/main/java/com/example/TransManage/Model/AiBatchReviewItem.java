package com.example.TransManage.Model;

public record AiBatchReviewItem(
        Long translationId,
        AiReviewResponse review) {
}