package com.ssafy.codearena.user.service;

import com.ssafy.codearena.user.dto.*;

public interface UserService {

    UserResultDto join(UserJoinDto userJoinDto);
    UserResultDto login(UserLoginDto userLoginDto);
    UserResultDto checkDuplicatedNickname(String nickname);
    UserResultDto checkDuplicatedEmail(String email);
    UserResultDto reissue(UserReissueDto userReissueDto);
    UserResultDto searchUser(String userNickname);
    void saveRefreshToken(String userEmail, String refreshToken);
    UserResultDto changePassword(UserChangePasswordDto userChangePasswordDto);
}
