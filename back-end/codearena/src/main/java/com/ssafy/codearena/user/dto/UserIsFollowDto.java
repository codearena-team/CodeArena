package com.ssafy.codearena.user.dto;

import lombok.Data;

@Data
public class UserIsFollowDto {
    private String fromId;
    private String toId;
}
