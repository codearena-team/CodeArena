package com.ssafy.codearena.auth.dto;

import lombok.Data;

@Data
public class AuthResultDto {
    private String status;
    private String msg;
    private Object data;
}
