package com.ssafy.codearena.user.dto;

import lombok.Data;

@Data
public class UserFollowDto {
    private String fromID;
    private String toId;
}
