package com.ssafy.codearena.judge.service;

import com.codearena.judge.dto.*;
import com.ssafy.codearena.judge.dto.*;

public interface JudgeService {
    JudgeResultDto validationCheck(JudgeValidationCheckDto judgeValidationCheckDto);
    JudgeResultDto judgeArena(JudgeArenaDto judgeArenaDto);
    JudgeResultDto judgeNormal(JudgeNormalDto judgeNormalDto);
    JudgeResultDto judgeExample(JudgeExampleDto judgeExampleDto);
}
