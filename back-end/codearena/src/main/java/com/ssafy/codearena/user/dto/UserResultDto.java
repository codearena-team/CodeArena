package com.ssafy.codearena.user.dto;

import lombok.Data;

@Data
public class UserResultDto {
    private String status;
    private String msg;
    private Object data;
}
