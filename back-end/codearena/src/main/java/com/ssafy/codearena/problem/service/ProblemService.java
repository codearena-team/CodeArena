package com.ssafy.codearena.problem.service;

import com.ssafy.codearena.problem.dto.ProblemDetailDto;
import com.ssafy.codearena.problem.dto.ProblemForInsertDto;
import com.ssafy.codearena.problem.dto.ResultDto;
import com.ssafy.codearena.problem.dto.SubmitDto;

import java.util.HashMap;

public interface ProblemService {
    ResultDto getProblemList(HashMap<String, String> map);

    ResultDto insertProblem(ProblemForInsertDto problemForInsertDto);

    ResultDto deleteProblem(String problemId);

    ResultDto getTagCategory();
    ResultDto getProblemDetail(String problemId);
    ResultDto getTestCase(String problemId);
    ResultDto insertSubmit(String problemId, SubmitDto submitDto);
    ResultDto getSubmitList(HashMap<String, String> params);
    ResultDto getSubmitStatistics(String problemId, HashMap<String, String> params);
    ResultDto getProblemDetailForUpdate(String problemId);
    ResultDto updateProblem(ProblemForInsertDto problemForInsertDto);
}
