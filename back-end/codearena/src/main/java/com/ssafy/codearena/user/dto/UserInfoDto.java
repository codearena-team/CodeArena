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
    private String userThumbnail;
    private String userCoin;
    private int isFollow;
}
