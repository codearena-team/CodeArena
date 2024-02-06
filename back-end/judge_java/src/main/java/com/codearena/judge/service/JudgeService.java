package com.codearena.judge.service;

import com.codearena.judge.dto.JudgeResultDto;
import com.codearena.judge.dto.JudgeValidationCheckDto;

public interface JudgeService {
    JudgeResultDto validationCheck(JudgeValidationCheckDto judgeValidationCheckDto);
}
