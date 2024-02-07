package com.codearena.judge.dto;

import lombok.Data;

import java.util.List;

@Data
public class JudgeProblemInfoDto {
    private Long problemTime;
    private String problemMem;
    private List<TestCaseDto> testCaseList;
}
