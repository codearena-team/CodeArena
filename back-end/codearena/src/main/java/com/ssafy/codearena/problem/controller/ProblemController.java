package com.ssafy.codearena.problem.controller;


import com.ssafy.codearena.problem.dto.ProblemForInsertDto;
import com.ssafy.codearena.problem.dto.ResultDto;
import com.ssafy.codearena.problem.dto.SubmitDto;
import com.ssafy.codearena.problem.service.ProblemService;
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

    @GetMapping("/category")
    private ResponseEntity<ResultDto> getAllCategories(){
        ResultDto resultDto = service.getTagCategory();
        return new ResponseEntity<ResultDto>(resultDto, HttpStatus.OK);
    }
    @GetMapping("{problemId}")
    private ResponseEntity<ResultDto> getProblemDetail(@PathVariable String problemId){
        ResultDto resultDto = service.getProblemDetail(problemId);
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

}
