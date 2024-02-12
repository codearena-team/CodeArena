package com.ssafy.codearena.user.dto;

import lombok.Data;

@Data
public class VerifyDto {
    private String userId;
    private String verifyCode;
}
