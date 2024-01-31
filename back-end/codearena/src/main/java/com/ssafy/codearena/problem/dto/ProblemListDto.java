package com.ssafy.codearena.problem.dto;

import lombok.Data;

import java.util.List;


@Data
public class ProblemListDto {
    private int itemCount;
    private int pageCount;
    private List<ProblemWithSearchDto> problemWithSearch;
}
