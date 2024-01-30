package com.ssafy.codearena.problem.dto;


import lombok.Data;

import java.util.List;

@Data
public class ProblemForInsertDto {
    private String userId;
    private Integer problemId;
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
    private Integer problemRating;
    private List<TestCaseDto> testCase;
    private List<TagDto> tagList;
}
