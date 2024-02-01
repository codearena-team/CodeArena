package com.ssafy.codearena.auth.mapper;

import com.ssafy.codearena.auth.dto.AccessTokenDto;
import com.ssafy.codearena.user.dto.TokenDataDto;

public interface AuthMapper {
    TokenDataDto checkRefreshToken(String refreshToken);
}
