package com.ssafy.codearena.auth.dto;

import lombok.Data;

@Data
public class AccessTokenDto {
    private String userId;
    private String userEmail;
    private String userNickname;
}
