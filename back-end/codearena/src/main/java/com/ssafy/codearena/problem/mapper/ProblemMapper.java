package com.ssafy.codearena.problem.mapper;


import com.ssafy.codearena.problem.dto.ProblemWithSearchDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

@Mapper
public interface ProblemMapper {
    List<ProblemWithSearchDto> selectProblemList(HashMap<String, String> hashMap) throws SQLException;
    int problemCount(HashMap<String, String> hashMap) throws SQLException;
}
