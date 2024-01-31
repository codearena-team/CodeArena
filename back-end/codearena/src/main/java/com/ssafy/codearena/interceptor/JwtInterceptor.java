package com.ssafy.codearena.interceptor;

import com.ssafy.codearena.user.dto.UserResultDto;
import com.ssafy.codearena.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtInterceptor implements HandlerInterceptor {

    private final String HEADER_AUTH = "Authorization";

    private final JwtUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        final String token = request.getHeader(HEADER_AUTH);

        if (token != null && jwtUtil.checkToken(token)) {
            log.info("access 토큰 사용 가능 : {}", token);
            return true;

        } else {
            log.info("access 토큰 사용 불가능 : {}", token);

            // 302 넣고 토큰 에러 리턴
            UserResultDto userResultDto = new UserResultDto();
            userResultDto.setStatus("302");
            userResultDto.setMsg("토큰 사용 불가");
            userResultDto.setData(null);

            request.setAttribute("tokenError" , userResultDto);

            request.getRequestDispatcher("/error").forward(request, response);

            log.info("request에 메세지 담음 : {} " , request);

            return false;
        }
    }
}
