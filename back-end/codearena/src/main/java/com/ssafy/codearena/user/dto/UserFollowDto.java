package com.ssafy.codearena.user.dto;

import lombok.Data;

@Data
public class UserFollowDto {
    private String fromId;
    private String toId;
}
