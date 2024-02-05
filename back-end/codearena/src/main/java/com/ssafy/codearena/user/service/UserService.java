package com.ssafy.codearena.user.service;

import com.ssafy.codearena.user.dto.*;
import jakarta.servlet.http.HttpServletResponse;

import java.net.http.HttpResponse;

public interface UserService {

    UserResultDto join(UserJoinDto userJoinDto);
    UserResultDto login(HttpServletResponse response, UserLoginDto userLoginDto);
    UserResultDto logout(String userEmail);
    UserResultDto checkDuplicatedNickname(String nickname);
    UserResultDto checkDuplicatedEmail(String email);
    UserResultDto reissue(UserReissueDto userReissueDto);
    UserResultDto searchUser(UserSearchDto userSearchDto);
    UserResultDto changePassword(UserChangePasswordDto userChangePasswordDto);
    UserResultDto changeUserInfo(UserChangeInfoDto userChangeInfoDto);
    UserResultDto follow(UserFollowDto userFollowDto);
    UserResultDto unfollow(UserFollowDto userFollowDto);
    UserResultDto getFollowList(String userNickname);
    UserResultDto getFollowingList(String userNickname);
}
