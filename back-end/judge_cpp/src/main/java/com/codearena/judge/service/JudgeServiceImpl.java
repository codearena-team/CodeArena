package com.codearena.judge.service;

import com.codearena.judge.dto.*;
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
        judgeResultDto.setData(null);

        JudgeValidateResultDto result = new JudgeValidateResultDto();

        log.info("{}", userInput.getProblemValidationCode());

        // 시스템 콜 감지
        if(judgeUtil.checkSystemCallInCode(userInput.getProblemValidationCode())) {
            judgeResultDto.setStatus("404");
            judgeResultDto.setMsg("코드 내 시스템 콜 감지");
            return judgeResultDto;
        }

        try {
            // problemExInput, Output 를 테스트케이스에 포함시킴
            List<TestCaseDto> testCase = userInput.getTestCase();
            testCase.add(new TestCaseDto(userInput.getProblemExInput(), userInput.getProblemExOutput(), null));

            // 테케 내용들 로그 출력
            for (int tc = 0; tc < testCase.size(); tc++) {
                log.info("{}", testCase.get(tc));
            }

            long timeLimit = Long.parseLong(userInput.getProblemTime());

            String path = UUID.randomUUID().toString();

            String cmd = "./" + path + "/Solution";
            log.info("CMD : {}", cmd);

            // 폴더 생성하기
            judgeUtil.createFolder(path);
            // 코드 파일 생성하기 (solution.java)
            judgeUtil.createCodeFile(userInput.getProblemValidationCode(), path);
            // 코드 검증하기
            result = judgeUtil.validate(cmd, testCase, timeLimit, path);
            log.info("[validationCheck] judgeValidationResult : {}" , result);

        } catch (Exception e) {
            log.debug("[validationCheck] Exception : {}" , e);
            judgeResultDto.setStatus("500");
            judgeResultDto.setMsg("서버 내부 에러");
        }

        judgeResultDto.setData(result);

        return judgeResultDto;
    }

    @Override
    public JudgeResultDto judgeArena(JudgeArenaDto userInput) {
        JudgeResultDto judgeResultDto = new JudgeResultDto();

        judgeResultDto.setStatus("200");
        judgeResultDto.setMsg("일반 문제 채점 완료");
        judgeResultDto.setData(null);

        JudgeValidateResultDto result = null;

        // 시스템 콜 체크
        if(judgeUtil.checkSystemCallInCode(userInput.getCode())) {
            judgeResultDto.setStatus("404");
            judgeResultDto.setMsg("코드 내 시스템 콜 감지");
            judgeResultDto.setData(null);
            return judgeResultDto;
        }

        try {
            // 문제 정보 가져오기
            JudgeProblemInfoDto problemInfo = judgeUtil.getProblemInfo(userInput.getProblemId());

            String path = UUID.randomUUID().toString();

            String cmd = path + "/Solution.out";

            // 폴더 생성하기
            judgeUtil.createFolder(path);
            // 코드 파일 생성하기 (solution.java)
            judgeUtil.createCodeFile(userInput.getCode(), path);
            // 코드 검증하기
            result = judgeUtil.validate(cmd, problemInfo.getTestCaseList(), problemInfo.getProblemTime(), path);

            log.info("[arena] judgeValidationResult : {}" , result);

            result.setSubmitNo(userInput.getSubmitNo());

            // 효율전이면
            if("1".equals(userInput.getGameType()))
                mapper.updateArenaSubmit(result);

        } catch (Exception e) {
            log.debug("[arena] Exception : {}", e);
            judgeResultDto.setStatus("500");
            judgeResultDto.setMsg("서버 내부 에러");
        }

        judgeResultDto.setData(result);

        return judgeResultDto;
    }

    @Override
    public JudgeResultDto judgeNormal(JudgeNormalDto userInput) {

        log.debug("[normal] userInput : {}", userInput);

        JudgeResultDto judgeResultDto = new JudgeResultDto();

        judgeResultDto.setStatus("200");
        judgeResultDto.setMsg("일반 문제 채점 완료");
        judgeResultDto.setData(null);

        JudgeValidateResultDto result = null;



//         시스템 콜 체크
        if(judgeUtil.checkSystemCallInCode(userInput.getCode())) {
            judgeResultDto.setStatus("404");
            judgeResultDto.setMsg("코드 내 시스템 콜 감지");
            judgeResultDto.setData(null);
            return judgeResultDto;
        }

        try {
            // 문제 정보 가져오기
            JudgeProblemInfoDto problemInfo = judgeUtil.getProblemInfo(userInput.getProblemId());

            String path = UUID.randomUUID().toString();

            String cmd = path + "/Solution.out";

            // 폴더 생성하기
            judgeUtil.createFolder(path);
            // 코드 파일 생성하기 (solution.java)
            judgeUtil.createCodeFile(userInput.getCode(), path);


            // 코드 검증하기
            result = judgeUtil.validate(cmd, problemInfo.getTestCaseList(), problemInfo.getProblemTime(), path);
            log.info("[normal] judgeValidationResult : {}" , result);

            result.setSubmitNo(userInput.getSubmitNo());
            log.info("userInput : {}" , userInput);
            log.info("result : {}" , result);
            mapper.updatePsSubmit(result);

        } catch (Exception e) {
            log.debug("Exception : {}", e);

            judgeResultDto.setStatus("500");
            judgeResultDto.setMsg("서버 내부 에러");
        }

        judgeResultDto.setData(result);

        return judgeResultDto;
    }
}
