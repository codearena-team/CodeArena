package com.ssafy.codearena.problem.mapper;


import com.ssafy.codearena.problem.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

@Mapper
public interface ProblemMapper {
    List<ProblemWithSearchDto> selectProblemList(HashMap<String, String> hashMap) throws SQLException;
    int problemCount(HashMap<String, String> hashMap) throws SQLException;
    void insertProblem(ProblemForInsertDto problemForInsertDto) throws SQLException;
    void insertTestCase(TCListDto tcListDto) throws SQLException;
    void insertProblemTagList(TagListDto tagListDto) throws SQLException;
    void deleteProblem(String problemId) throws SQLException;
    List<TagDto> getAllTagNames() throws SQLException;
}
