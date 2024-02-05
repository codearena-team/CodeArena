package com.ssafy.codearena.user.dto;

import com.ssafy.codearena.problem.dto.ProblemForInsertDto;
import lombok.Data;

import java.util.List;

@Data
public class UserSearchResultDto {
    private UserInfoDto userInfoDto;
    private List<UserProblemDto> solvedProblem;
    private List<UserProblemDto> unsolvedProblem;
    private List<UserProblemCateDto> problemCateList;

}
