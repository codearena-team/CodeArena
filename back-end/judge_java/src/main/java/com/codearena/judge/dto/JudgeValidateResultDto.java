package com.codearena.judge.dto;

import lombok.Data;

@Data
public class JudgeValidateResultDto {
    private boolean isSolve;
    private String msg;
    private String totalTime;
}
