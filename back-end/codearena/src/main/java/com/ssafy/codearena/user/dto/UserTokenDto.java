package com.ssafy.codearena.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserTokenDto {
    private String refreshToken;
}
