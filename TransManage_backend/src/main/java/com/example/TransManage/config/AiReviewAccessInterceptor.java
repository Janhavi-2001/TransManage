package com.example.TransManage.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class AiReviewAccessInterceptor implements HandlerInterceptor {
    private static final String SESSION_USER_ID = "AUTHENTICATED_USER_ID";

    private final ConcurrentHashMap<String, RateWindow> windows = new ConcurrentHashMap<>();
    private final int maxRequests;
    private final long windowMillis;

    public AiReviewAccessInterceptor(
            @Value("${ai.review.max-requests:30}") int maxRequests,
            @Value("${ai.review.window-seconds:60}") long windowSeconds) {
        this.maxRequests = maxRequests;
        this.windowMillis = windowSeconds * 1000L;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws IOException {
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            return true;
        }

        if (request.getSession(false) == null
                || request.getSession(false).getAttribute(SESSION_USER_ID) == null) {
            writeError(response, HttpServletResponse.SC_UNAUTHORIZED, "Authentication is required for AI review");
            return false;
        }

        String key = request.getRemoteAddr() + ":" + request.getSession(false).getAttribute(SESSION_USER_ID);
        RateWindow window = windows.computeIfAbsent(key, ignored -> new RateWindow());
        long now = System.currentTimeMillis();
        synchronized (window) {
            if (now - window.startedAt >= windowMillis) {
                window.startedAt = now;
                window.requests = 0;
            }
            if (window.requests >= maxRequests) {
                writeError(response, 429,
                        "AI review rate limit exceeded; try again later");
                return false;
            }
            window.requests++;
        }
        return true;
    }

    private void writeError(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write("{\"error\":\"" + message + "\"}");
    }

    private static final class RateWindow {
        private long startedAt = System.currentTimeMillis();
        private int requests;
    }
}
