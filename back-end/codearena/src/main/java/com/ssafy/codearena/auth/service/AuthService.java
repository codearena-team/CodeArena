package com.ssafy.codearena.auth.service;

import com.ssafy.codearena.auth.dto.AuthResultDto;
import com.ssafy.codearena.auth.dto.RenewTokenDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    AuthResultDto check(HttpServletRequest request);
    AuthResultDto renewAccessToken(HttpServletResponse response, RenewTokenDto renewTokenDto);
}
