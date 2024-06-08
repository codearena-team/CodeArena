package com.ssafy.codearena.judge.dto;

import lombok.Data;

@Data
public class JudgeValidateResultDto {
    private boolean isSolve;
    private String submitNo;
    private String msg;
    private String time;
    private String wrongTestCaseNo;
}
