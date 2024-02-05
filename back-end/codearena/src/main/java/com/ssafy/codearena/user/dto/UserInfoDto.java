package com.ssafy.codearena.user.dto;

import lombok.Data;

@Data
public class UserInfoDto {
    private String userId;
    private String userEmail;
    private String userNickname;
    private String userIntro;
    private String speedRating;
    private String effiRating;
    private int isFollow;
}
