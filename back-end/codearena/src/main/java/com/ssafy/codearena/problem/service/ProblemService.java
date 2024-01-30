package com.ssafy.codearena.problem.service;

import com.ssafy.codearena.problem.dto.ProblemForInsertDto;
import com.ssafy.codearena.problem.dto.ResultDto;

import java.util.HashMap;

public interface ProblemService {
    ResultDto getProblemList(HashMap<String, String> map);

    ResultDto insertProblem(ProblemForInsertDto problemForInsertDto);
}
