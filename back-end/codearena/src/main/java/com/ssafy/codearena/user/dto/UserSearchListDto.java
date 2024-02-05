package com.ssafy.codearena.user.dto;

import lombok.Data;

@Data
public class UserSearchListDto {
    private String userId;
    private String userNickname;
    private String isFollow;
}
