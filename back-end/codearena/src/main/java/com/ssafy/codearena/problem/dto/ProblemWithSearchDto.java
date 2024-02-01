package com.ssafy.codearena.problem.dto;


import lombok.Data;

@Data
public class ProblemWithSearchDto {
    String problemId;
    String userNickname;
    String problemTitle;
    String problemRating;
    String submitCount;
    String acceptCount;
    String percentage;
}
