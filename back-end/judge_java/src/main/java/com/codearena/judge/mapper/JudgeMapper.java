package com.codearena.judge.mapper;

import com.codearena.judge.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Mapper
public interface JudgeMapper {
    void insertProblem(JudgeValidationCheckDto userInput) throws SQLException;
    JudgeProblemInfoDto getProblemInfo(String problemId) throws SQLException;
    List<TestCaseDto> getTestCase(String problemId) throws SQLException;
    void updatePsSubmit(JudgeNormalResultDto JudgeNormalResultDto) throws SQLException;
}
