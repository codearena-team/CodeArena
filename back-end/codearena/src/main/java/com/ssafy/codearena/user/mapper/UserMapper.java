package com.ssafy.codearena.user.mapper;

import com.ssafy.codearena.user.dto.UserJoinDto;
import com.ssafy.codearena.user.dto.UserLoginDto;
import com.ssafy.codearena.user.dto.UserReissueDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;

@Mapper
public interface UserMapper {
    void join(UserJoinDto userJoinDto) throws SQLException;
    int checkNickname(String nickname) throws SQLException;
    int checkEmail(String email) throws SQLException;
    int login(UserLoginDto userLoginDto) throws SQLException;
//    int reissue(UserReissueDto userReissueDto) throws SQLException;

}
