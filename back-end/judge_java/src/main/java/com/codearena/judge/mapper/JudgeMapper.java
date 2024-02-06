package com.codearena.judge.mapper;

import com.codearena.judge.dto.JudgeValidationCheckDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;

@Mapper
public interface JudgeMapper {
    void insertProblem(JudgeValidationCheckDto userInput) throws SQLException;
}
