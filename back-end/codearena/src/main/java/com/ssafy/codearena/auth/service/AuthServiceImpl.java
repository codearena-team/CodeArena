package com.ssafy.codearena.auth.service;

import com.ssafy.codearena.auth.dto.AccessTokenDto;
import com.ssafy.codearena.auth.dto.AuthResultDto;
import com.ssafy.codearena.auth.dto.RenewTokenDto;
import com.ssafy.codearena.auth.mapper.AuthMapper;
import com.ssafy.codearena.user.dto.TokenDataDto;
import com.ssafy.codearena.user.dto.UserResultDto;
import com.ssafy.codearena.util.JwtUtil;
import io.jsonwebtoken.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthMapper mapper;

    private final JwtUtil jwtUtil;
    private final String HEADER_AUTH = "Authorization";


    @Override
    public AuthResultDto check(HttpServletRequest request) {

        //응애

        AuthResultDto authResultDto = new AuthResultDto();
        authResultDto.setStatus("200");
        authResultDto.setMsg("토큰 사용 가능");
        authResultDto.setData(null);

        String token = request.getHeader(HEADER_AUTH);

        if ("".equals(token) || !jwtUtil.checkToken(token)) {
            authResultDto.setStatus("302");
            authResultDto.setMsg("토큰 사용 불가 재발급 요청 필요");
            authResultDto.setData(null);
        }

        return authResultDto;
    }

    @Override
    public AuthResultDto renewAccessToken(HttpServletResponse response, RenewTokenDto renewTokenDto) {
        AuthResultDto authResultDto = new AuthResultDto();

        authResultDto.setStatus("200");
        authResultDto.setMsg("토큰 재발급 완료");
        authResultDto.setData(null);

        String refreshToken = renewTokenDto.getRefreshToken();
        // 재발급 요청이 들어오면 우선 refresh 토큰을 찾아서 확인

        // 해당 토큰이 사용 가능한지 확인
        if (jwtUtil.checkToken(refreshToken)) {
            // 토큰을 가지고 있는 사람이 있는지 확인
            TokenDataDto result = mapper.checkRefreshToken(refreshToken);

            // 해당 토큰을 가진 사람이 있다면
            if (result != null) {
                // access 토큰 재발급 해서 보내주기
                String accessToken = jwtUtil.createAccessToken(result);

//                response.setHeader("Authorization");

//                // 쿠키 만들기
//                ResponseCookie cookie = ResponseCookie.from("accessToken", accessToken)
//                        .maxAge( 15)  // 액세스 토큰의 유효기간은 15초로 설정
//                        .path("/")
//                        .httpOnly(true)  // 브라우저에서 토큰에 접근할 수 없도록 하는 설정
//                        .sameSite("None")  // 모든 도메인에서 사용이 가능하도록 설정
////                      .secure(true)   https 환경에서만 사용이 가능하도록 하는 옵션
//                        .build();
//
//                // response 헤더에 "Set-Cookie" 로 access 토큰을 전달한다.
//                response.setHeader("Set-Cookie", cookie.toString());

            } else {
                // 해당 refresh 토큰을 가진 사람이 없다면
                authResultDto.setStatus("404");
                authResultDto.setMsg("해당 토큰의 사용자 없음");
            }
        } else {
            // 토큰이 사용 불가하다면 재 로그인 요청
            authResultDto.setStatus("302");
            authResultDto.setMsg("refreshToken 사용 불가. 로그인 필요");
        }

        return authResultDto;
    }
}
