package com.ssafy.codearena.problem.service;

import com.ssafy.codearena.problem.dto.*;
import com.ssafy.codearena.user.dto.UserProblemCateDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.List;

public interface ProblemService {
    ResultDto getProblemList(HashMap<String, String> map);

    ResultDto insertProblem(ProblemForInsertDto problemForInsertDto);

    ResultDto deleteProblem(String problemId);

    ResultDto getTagCategory();
    ResultDto getProblemDetail(String problemId, HttpServletRequest request);
    ResultDto getTestCase(String problemId);
    ResultDto insertSubmit(String problemId, SubmitDto submitDto);
    ResultDto getSubmitList(HashMap<String, String> params);
    ResultDto getSubmitStatistics(String problemId, HashMap<String, String> params);
    ResultDto getProblemDetailForUpdate(String problemId);
    ResultDto updateProblem(ProblemForInsertDto problemForInsertDto);
    ResultDto updateProblemStatus(String problemId, HashMap<String, String> params, HttpServletRequest request);
    SolveAndUnsolveDto getSolveAndUnsolveList(String nickName) throws Exception;
    List<UserProblemCateDto> getProblemCateList(String nickName) throws Exception;

}
