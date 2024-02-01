package com.ssafy.codearena.problem.dto;


import lombok.Data;

import java.util.List;


//submit_no, tid, user_id, problem_id, submit_lang, code, submit_status, time_complexity, memory, submit_date
@Data
public class SubmitDto {
    Integer submitNo;
    Integer tid;
    String userId;
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
