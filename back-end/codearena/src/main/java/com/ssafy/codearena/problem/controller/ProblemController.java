package com.ssafy.codearena.problem.controller;


import com.ssafy.codearena.problem.dto.ResultDto;
import com.ssafy.codearena.problem.dto.SearchDto;
import com.ssafy.codearena.problem.service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/problem")
@RequiredArgsConstructor
public class ProblemController {

    private final ProblemService service;
    @GetMapping
    private ResponseEntity<ResultDto> getProblemList(@RequestParam HashMap<String, String> map){
        ResultDto resultDto = service.getProblemList(map);
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }
}
