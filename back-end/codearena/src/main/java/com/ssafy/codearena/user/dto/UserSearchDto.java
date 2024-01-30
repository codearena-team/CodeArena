package com.ssafy.codearena.user.dto;

import lombok.Data;

import java.util.ArrayList;

@Data
public class UserSearchDto {
    private UserInfoDto userInfoDto;
    private ArrayList<Integer> solvedProblem;
    private ArrayList<Integer> wrongProblem;
    private CntOfCate cntOfCate;
}