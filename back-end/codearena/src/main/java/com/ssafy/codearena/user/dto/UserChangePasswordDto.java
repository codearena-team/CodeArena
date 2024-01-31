package com.ssafy.codearena.user.dto;

import lombok.Data;

@Data
public class UserChangePasswordDto {
    private String userEmail;
    private String userPassword;
}
