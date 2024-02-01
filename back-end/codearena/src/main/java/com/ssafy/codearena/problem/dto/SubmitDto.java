package com.ssafy.codearena.problem.dto;


import lombok.Data;

import java.util.List;

@Data
public class SubmitDto {
    Integer submitNo;
    Integer tid;
    String userId;
    String userNickname;
    String problemId;
    String submitLang;
    String code;
    String submitStatus;
    String timeComplexity;
    String memory;
    String submitDate;
    TestCaseDto testCaseDto;
    List<SubmitTagDto> tagList;
}
