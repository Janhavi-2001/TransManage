package com.example.TransManage.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final AiReviewAccessInterceptor aiReviewAccessInterceptor;

    public WebConfig(AiReviewAccessInterceptor aiReviewAccessInterceptor) {
        this.aiReviewAccessInterceptor = aiReviewAccessInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(aiReviewAccessInterceptor)
                .addPathPatterns(
                        "/api/projects/*/pages/*/ai-review",
                        "/api/projects/*/pages/*/translation-keys/*/translations/*/ai-review");
    }
}
