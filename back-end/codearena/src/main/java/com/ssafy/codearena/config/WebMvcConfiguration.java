package com.ssafy.codearena.config;

import com.ssafy.codearena.interceptor.JwtInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfiguration implements WebMvcConfigurer {

    private final JwtInterceptor jwtInterceptor;

    // 인터셉터 제외할 path : 로그인, 닉네임+이메일 중복검사, 비밀번호 임시발급, 회원가입, 다른 회원 조회
    private final List<String> excludePointList = Arrays.asList (
//            "/**/login", "/**/duplicate", "/**/password/reissue", "/**/join", "/problem", "/alarm" ,"/error", "/user"
            "/**"
    );
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")
                .allowedOrigins("*")
//			.allowedOrigins("http://localhost:5173", "http://localhost:5174")
                .allowedMethods(HttpMethod.GET.name(), HttpMethod.POST.name(), HttpMethod.PUT.name(),
                        HttpMethod.DELETE.name(), HttpMethod.HEAD.name(), HttpMethod.OPTIONS.name(),
                        HttpMethod.PATCH.name())
//			.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD")
//			.allowCredentials(true)
//			.exposedHeaders("*")
                .maxAge(1800); // Pre-flight Caching
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor)
        // 토큰 검사할 애들을 설정해준다.
                .excludePathPatterns(excludePointList);
        // 토큰 검사하지 않을 애들을 설정해준다.
        //      .addPathPatterns(addEndPointList)
    }
}
