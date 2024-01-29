package com.ssafy.codearena.user.dto;

import lombok.Data;

@Data
public class UserInfoDto {
    private int userId;
    private String userEmail;
    private String userNickname;
    private String userIntro;
    private int speedRating;
    private int effiRating;
}
