package com.ssafy.codearena.profile.dto;

import lombok.Data;

@Data
public class S3ResultDto {
    private String status;
    private String msg;
    private Object data;
}
