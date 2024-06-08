package com.ssafy.codearena.judge.controller;

import com.codearena.judge.dto.*;
import com.ssafy.codearena.judge.dto.*;
import com.ssafy.codearena.judge.service.JudgeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/judge")
public class JudgeController {

    private final JudgeService judgeService;

    // 검증용 로직
    // 코드, 테케 필요
    @PostMapping("/validation")
    public ResponseEntity<JudgeResultDto> validationCheck(@RequestBody JudgeValidationCheckDto judgeValidationCheckDto) {
        return new ResponseEntity<JudgeResultDto>(judgeService.validationCheck(judgeValidationCheckDto), HttpStatus.OK);
    }
    @PostMapping("/arena")
    public ResponseEntity<JudgeResultDto> judgeArena(@RequestBody JudgeArenaDto judgeArenaDto) {
        return new ResponseEntity<JudgeResultDto>(judgeService.judgeArena(judgeArenaDto), HttpStatus.OK);
    }
    @PostMapping("/normal")
    public ResponseEntity<JudgeResultDto>  judgeNormal(@RequestBody JudgeNormalDto judgeNormalDto) {
        return new ResponseEntity<JudgeResultDto>(judgeService.judgeNormal(judgeNormalDto), HttpStatus.OK);
    }
    @PostMapping("/example")
    public ResponseEntity<JudgeResultDto>  judgeExample(@RequestBody JudgeExampleDto judgeExampleDto) {
        return new ResponseEntity<JudgeResultDto>(judgeService.judgeExample(judgeExampleDto), HttpStatus.OK);
    }
}
