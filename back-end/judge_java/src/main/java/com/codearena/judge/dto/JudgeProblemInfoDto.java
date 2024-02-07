package com.codearena.judge.dto;

import lombok.Data;

import java.util.List;

@Data
public class JudgeProblemInfoDto {
    private String problemTime;
    private String problemMem;
    private List<TestCaseDto> testCaseList;
}
