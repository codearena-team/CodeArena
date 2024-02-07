package com.codearena.judge.service;

import com.codearena.judge.dto.JudgeArenaDto;
import com.codearena.judge.dto.JudgeNormalDto;
import com.codearena.judge.dto.JudgeResultDto;
import com.codearena.judge.dto.JudgeValidationCheckDto;

public interface JudgeService {
    JudgeResultDto validationCheck(JudgeValidationCheckDto judgeValidationCheckDto);
    JudgeResultDto judgeArena(JudgeArenaDto judgeArenaDto);
    JudgeResultDto judgeNormal(JudgeNormalDto judgeNormalDto);
}
