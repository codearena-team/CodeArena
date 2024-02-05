package com.ssafy.codearena.problem.dto;

import lombok.Data;

import java.util.List;


@Data
public class SolveAndUnsolveDto {
    private int solveCount;
    private int unSolveCount;
    private List<ProblemForInsertDto> solveList;
    private List<ProblemForInsertDto> unSolveList;
}
