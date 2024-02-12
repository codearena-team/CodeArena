package com.ssafy.codearena.user.dto;

import lombok.Data;

@Data
public class UserJoinDto {
    private String userEmail;
    private String userPassword;
    private String userNickname;
    private String userIntro;
    private String userThumbnail;
}
