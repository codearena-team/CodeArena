package com.ssafy.codearena.user.dto;

import lombok.Data;

@Data
public class UserFollowNicknameDto {
    private String fromNickname;
    private String toNickname;
}
