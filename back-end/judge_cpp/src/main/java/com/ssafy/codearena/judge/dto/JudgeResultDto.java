package com.ssafy.codearena.judge.dto;

import lombok.Data;

@Data
public class JudgeResultDto {
    private String status;
    private String msg;
    private Object data;
}
