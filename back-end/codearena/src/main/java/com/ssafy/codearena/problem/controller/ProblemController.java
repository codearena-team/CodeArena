package com.ssafy.codearena.problem.controller;


import com.ssafy.codearena.problem.dto.ProblemDetailDto;
import com.ssafy.codearena.problem.dto.ProblemForInsertDto;
import com.ssafy.codearena.problem.dto.ResultDto;
import com.ssafy.codearena.problem.dto.SubmitDto;
import com.ssafy.codearena.problem.service.ProblemService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.transform.Result;
import java.util.HashMap;

@RestController
@RequestMapping("/problem")
@RequiredArgsConstructor
@Slf4j
public class ProblemController {

    private final ProblemService service;
    @GetMapping
    private ResponseEntity<ResultDto> getProblemList(@RequestParam HashMap<String, String> map){
        ResultDto resultDto = service.getProblemList(map);
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

    @PostMapping
    private ResponseEntity<ResultDto> insertProblem(@RequestBody ProblemForInsertDto problemForInsertDto){
        log.debug("params : {}", problemForInsertDto);
        ResultDto resultDto = service.insertProblem(problemForInsertDto);


        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

    @DeleteMapping("{problemId}")
    private ResponseEntity<ResultDto> deleteProblem(@PathVariable String problemId){
        log.debug("params : {}", problemId);
        ResultDto resultDto = service.deleteProblem(problemId);
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }
    @PutMapping("{problemId}")
    private ResponseEntity<ResultDto> updateProblem(@RequestBody ProblemForInsertDto problemForInsertDto){
        log.debug("params : {}", problemForInsertDto);
        ResultDto resultDto = service.updateProblem(problemForInsertDto);
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

    @GetMapping("{problemId}/modify")
    private ResponseEntity<ResultDto> getProblemForUpdate(@PathVariable String problemId){
        log.debug("params : ", problemId);
        ResultDto resultDto = service.getProblemDetailForUpdate(problemId);
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

    @GetMapping("/category")
    private ResponseEntity<ResultDto> getAllCategories(){
        ResultDto resultDto = service.getTagCategory();
        return new ResponseEntity<ResultDto>(resultDto, HttpStatus.OK);
    }
    @GetMapping("{problemId}")
    private ResponseEntity<ResultDto> getProblemDetail(@PathVariable String problemId, HttpServletRequest request){
        ResultDto resultDto = service.getProblemDetail(problemId, request);
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }
    @GetMapping("{problemId}/testcase")
    private ResponseEntity<ResultDto> getTestCase(@PathVariable String problemId){
        ResultDto resultDto = service.getTestCase(problemId);
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

    @PostMapping("{problemId}/submit")
    private ResponseEntity<ResultDto> submitCode(@PathVariable String problemId, @RequestBody SubmitDto submitDto){
        ResultDto resultDto = service.insertSubmit(problemId, submitDto);
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

    @GetMapping("/submit")
    private ResponseEntity<ResultDto> getSubmitList(@RequestParam HashMap<String, String> params){
        ResultDto resultDto = service.getSubmitList(params);
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }
    @GetMapping("{problemId}/submit/statistics")
    private ResponseEntity<ResultDto> getStatistics(@PathVariable String problemId, @RequestParam HashMap<String, String> params){
        ResultDto resultDto = service.getSubmitStatistics(problemId, params);
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

    @PutMapping("{problemId}/status")
    private ResponseEntity<ResultDto> changeStatus(@PathVariable String problemId, @RequestBody HashMap<String, String> params, HttpServletRequest request){
        log.debug("param : {}", params);
        ResultDto resultDto = service.updateProblemStatus(problemId, params, request);
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }
}
