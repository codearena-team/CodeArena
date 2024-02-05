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
    ProblemDetailDto getProblemDetailByProblemId(String problemId) throws SQLException;
    List<TestCaseDto> getTestCasesByProblemId(String problemId) throws SQLException;
    void insertSubmit(SubmitDto submitDto) throws SQLException;
    void insertSubmitTags(SubmitTagListDto submitTagListDto) throws SQLException;
    List<SubmitDto> getSubmitList(HashMap<String, String> params) throws SQLException;
    int getSubmitCount(HashMap<String, String> params) throws SQLException;

    AvgByLangDto getAvgByLang(String problemId) throws SQLException;

    List<RatioOfAlgoDto> getRatioOfAlgo(String problemId) throws SQLException;

    int isAccept(HashMap<String, String> params) throws SQLException;

    ProblemForInsertDto getProblemDetailForUpdateByProblemId(String problemId) throws SQLException;

    void deleteProblemTagsByProblemId(int problemId) throws SQLException;

    int updateProblemByProblemId(ProblemForInsertDto problemForInsertDto) throws SQLException;

    int updateProblemStatusByProblemId(HashMap<String, String> params) throws SQLException;
}
