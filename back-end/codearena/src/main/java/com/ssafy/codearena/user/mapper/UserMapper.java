package com.ssafy.codearena.user.mapper;

import com.ssafy.codearena.user.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;

@Mapper
public interface UserMapper {
    void join(UserJoinDto userJoinDto) throws SQLException;
    int checkNickname(String nickname) throws SQLException;
    int checkEmail(String email) throws SQLException;
    TokenDataDto login(UserLoginDto userLoginDto) throws SQLException;
    int logout(String userEmail) throws SQLException;
    int reissue(UserReissueDto userReissueDto) throws SQLException;
    UserInfoDto searchUser(String userNickname) throws SQLException;
    ArrayList<Integer> getSolvedProblem(int userId) throws SQLException;
    ArrayList<Integer> getWrongProblem(int userId) throws SQLException;
    void saveRefreshToken(Map<String, String> map) throws SQLException;
    int changePassword(UserChangePasswordDto userChangePasswordDto) throws SQLException;
    int changeUserInfo(UserChangeInfoDto userChangeInfoDto) throws SQLException;
    void follow(UserFollowDto userFollowDto) throws SQLException;
    void unfollow(UserFollowDto userFollowDto) throws SQLException;
    ArrayList<UserFollowInfoDto> getFollowList(String userId) throws SQLException;
    ArrayList<UserFollowingInfoDto> getFollowingList(String userId) throws SQLException;

}
