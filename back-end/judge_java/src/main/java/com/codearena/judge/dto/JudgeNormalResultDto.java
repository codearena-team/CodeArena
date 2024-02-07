package com.codearena.judge.dto;

import lombok.Data;

@Data
public class JudgeNormalResultDto {
    private boolean isSolve;
    private String submitNo;
    private String msg;
    private String totalTime;
    private String wrongTestCaseNo;
}
