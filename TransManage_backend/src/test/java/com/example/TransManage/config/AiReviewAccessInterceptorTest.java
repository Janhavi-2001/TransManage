package com.example.TransManage.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.Test;

import java.io.PrintWriter;
import java.io.StringWriter;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class AiReviewAccessInterceptorTest {
    @Test
    void rejectsRequestsWithoutAnAuthenticatedSession() throws Exception {
        AiReviewAccessInterceptor interceptor = new AiReviewAccessInterceptor(30, 60);
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        when(response.getWriter()).thenReturn(new PrintWriter(new StringWriter()));

        when(request.getMethod()).thenReturn("POST");
        when(request.getSession(false)).thenReturn(null);

        assertFalse(interceptor.preHandle(request, response, new Object()));
        verify(response).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }

    @Test
    void rejectsRequestsAfterRateLimitIsReached() throws Exception {
        AiReviewAccessInterceptor interceptor = new AiReviewAccessInterceptor(1, 60);
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        HttpSession session = mock(HttpSession.class);
        StringWriter output = new StringWriter();

        when(request.getMethod()).thenReturn("POST");
        when(request.getSession(false)).thenReturn(session);
        when(session.getAttribute("AUTHENTICATED_USER_ID")).thenReturn(7L);
        when(request.getRemoteAddr()).thenReturn("127.0.0.1");
        when(response.getWriter()).thenReturn(new PrintWriter(output));

        assertTrue(interceptor.preHandle(request, response, new Object()));
        assertFalse(interceptor.preHandle(request, response, new Object()));
        verify(response).setStatus(429);
    }
}
