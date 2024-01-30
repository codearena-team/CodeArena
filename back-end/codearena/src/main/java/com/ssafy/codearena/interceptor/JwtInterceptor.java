package com.ssafy.codearena.interceptor;

import com.ssafy.codearena.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

@RequiredArgsConstructor
@Slf4j
public class JwtInterceptor implements HandlerInterceptor {

    private final String HEADER_AUTH = "Authorization";

    private JwtUtil jwtUtil;

    public JwtInterceptor(JwtUtil jwtUtil) {
        super();
        this.jwtUtil = jwtUtil;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        final String token = request.getHeader(HEADER_AUTH);

        if (token != null && jwtUtil.checkToken(token)) {
            log.info("토큰 사용 가능 : {}", token);
            return true;
        } else {
            log.info("토큰 사용 불가능 : {}", token);
            return false;
        }
    }
}
