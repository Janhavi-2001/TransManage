package com.example.TransManage.Model;

import java.util.List;

public record AiReviewResponse(
        int score,
        List<String> issues,
        String suggestedText,
        String recommendation) {
}