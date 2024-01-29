package com.ssafy.codearena.problem.service;

import com.ssafy.codearena.problem.dto.ResultDto;
import com.ssafy.codearena.problem.dto.SearchDto;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public interface ProblemService {
    ResultDto getProblemList(HashMap<String, String> map);
}
