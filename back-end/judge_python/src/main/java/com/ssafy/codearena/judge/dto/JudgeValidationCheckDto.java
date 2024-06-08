package com.ssafy.codearena.judge.dto;

import lombok.Data;

import java.util.List;

@Data
public class JudgeValidationCheckDto {
    private String problemValidationCode;
    private String problemExInput;
    private String problemExOutput;
    private String problemTime;
    private List<TestCaseDto> testCase;
}
