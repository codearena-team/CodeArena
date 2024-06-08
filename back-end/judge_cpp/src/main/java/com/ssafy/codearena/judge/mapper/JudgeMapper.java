package com.ssafy.codearena.judge.mapper;

import com.ssafy.codearena.judge.dto.JudgeProblemInfoDto;
import com.ssafy.codearena.judge.dto.JudgeValidateResultDto;
import com.ssafy.codearena.judge.dto.JudgeValidationCheckDto;
import com.ssafy.codearena.judge.dto.TestCaseDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface JudgeMapper {
    void insertProblem(JudgeValidationCheckDto userInput) throws SQLException;
    JudgeProblemInfoDto getProblemInfo(String problemId) throws SQLException;
    List<TestCaseDto> getTestCase(String problemId) throws SQLException;
    void updatePsSubmit(JudgeValidateResultDto judgeValidateResultDto) throws SQLException;
    void updateArenaSubmit(JudgeValidateResultDto judgeValidateResultDto) throws SQLException;
    TestCaseDto getExTestCase(String problemId) throws SQLException;

}
