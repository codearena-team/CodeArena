package com.ssafy.codearena.user.mapper;

import com.ssafy.codearena.user.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.ArrayList;

@Mapper
public interface UserMapper {
    void join(UserJoinDto userJoinDto) throws SQLException;
    int checkNickname(String nickname) throws SQLException;
    int checkEmail(String email) throws SQLException;
    int login(UserLoginDto userLoginDto) throws SQLException;
    int reissue(UserReissueDto userReissueDto) throws SQLException;
    UserInfoDto searchUser(String userNickname) throws SQLException;
    ArrayList<Integer> getSolvedProblem(int userId) throws SQLException;
    ArrayList<Integer> getWrongProblem(int userId) throws SQLException;

}
