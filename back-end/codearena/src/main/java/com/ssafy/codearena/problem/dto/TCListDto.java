package com.ssafy.codearena.problem.dto;

import lombok.Data;

import java.util.List;


@Data
public class TCListDto {
    private Integer problemId;
    private List<TestCaseDto> testCase;
}
