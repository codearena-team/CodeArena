package com.codearena.judge.dto;

import lombok.Data;

import java.util.List;

@Data
public class JudgeValidationCheckDto {
    private String userId;
    private String problemId;
    private String problemTitle;
    private String problemContent;

    private String problemInputDesc;
    private String problemOutputDesc;

    private String problemValidationCode;
    private String problemValidationLang;

    private String problemExInput;
    private String problemExOutput;

    private String problemTime;
    private String problemMem;

    private String problemRating;
    private List<TestCaseDto> testCase;
}
