package com.codearena.judge.service;

import com.codearena.judge.dto.JudgeResultDto;
import com.codearena.judge.dto.JudgeValidationCheckDto;
import com.codearena.judge.mapper.JudgeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class JudgeServiceImpl implements JudgeService{

    private final JudgeMapper judgeMapper;

    @Override
    public JudgeResultDto validationCheck(JudgeValidationCheckDto judgeValidationCheckDto) {
        JudgeResultDto judgeResultDto = new JudgeResultDto();
        judgeResultDto.setStatus("200");
        judgeResultDto.setMsg("문제 유효성 검사 완료");
        judgeResultDto.setData(null);

        try {

        } catch (Exception e) {
            log.debug("Exception : {}" , e);
            judgeResultDto.setStatus("500");
            judgeResultDto.setMsg("서버 내부 에러");
        }
        return null;
    }
}
