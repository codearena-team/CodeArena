package com.codearena.judge.service;

import com.codearena.judge.dto.JudgeResultDto;
import com.codearena.judge.dto.JudgeValidateResultDto;
import com.codearena.judge.dto.JudgeValidationCheckDto;
import com.codearena.judge.dto.TestCaseDto;
import com.codearena.judge.mapper.JudgeMapper;
import com.codearena.util.JudgeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
@RequiredArgsConstructor
public class JudgeServiceImpl implements JudgeService{

    private final JudgeMapper mapper;
    private final JudgeUtil judgeUtil;

    @Override
    public JudgeResultDto validationCheck(JudgeValidationCheckDto userInput) {
        JudgeResultDto judgeResultDto = new JudgeResultDto();
        judgeResultDto.setStatus("200");
        judgeResultDto.setMsg("문제 유효성 검사 완료");

        JudgeValidateResultDto result = new JudgeValidateResultDto();

        if(judgeUtil.checkSystemCallInCode(userInput.getProblemValidationCode())) {
            judgeResultDto.setStatus("404");
            judgeResultDto.setMsg("코드 내 시스템 콜 감지");
            judgeResultDto.setData(null);
            return judgeResultDto;
        }

        try {
            // problemExInput, Output 를 테스트케이스에 포함시킴
            List<TestCaseDto> testCase = userInput.getTestCase();
            testCase.add(new TestCaseDto(userInput.getProblemExInput(), userInput.getProblemExOutput()));

            long timeLimit = Long.parseLong(userInput.getProblemTime());

            String path = UUID.randomUUID().toString();

            String cmd = "java" + path + "/solution.java";

            // 폴더 생성하기
            judgeUtil.createFolder(path);
            // 코드 파일 생성하기 (solution.java)
            judgeUtil.createCodeFile(userInput.getProblemValidationCode(), path);
            // 런타임 생성하기
            Runtime runtime = Runtime.getRuntime();
            // 코드 검증하기
            result = judgeUtil.validate(runtime, cmd, testCase, timeLimit, path);

        } catch (Exception e) {
            log.debug("Exception : {}" , e);
            judgeResultDto.setStatus("500");
            judgeResultDto.setMsg("서버 내부 에러");
        }

        judgeResultDto.setData(result);

        return judgeResultDto;
    }

}
