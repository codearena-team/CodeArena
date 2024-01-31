package com.ssafy.codearena.user.service;

import com.ssafy.codearena.user.dto.UserDuplicatedDto;
import com.ssafy.codearena.user.dto.UserJoinDto;
import com.ssafy.codearena.user.dto.UserLoginDto;
import com.ssafy.codearena.user.dto.UserResultDto;
import com.ssafy.codearena.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserMapper mapper;

    @Override
    public UserResultDto join(UserJoinDto userJoinDto) {

        UserResultDto userResultDto = new UserResultDto();

        userResultDto.setStatus("201");
        userResultDto.setMsg("회원가입 성공");
        userResultDto.setData(null);

        try {
            String lowerEmail = userJoinDto.getUserEmail().toLowerCase();
            userJoinDto.setUserEmail(lowerEmail);
            mapper.join(userJoinDto);
        } catch (Exception e) {
            userResultDto.setStatus("500");
            userResultDto.setMsg("회원가입 실패");
            userResultDto.setData(null);
        }

        return userResultDto;
    }
    @Override
    public UserResultDto login(UserLoginDto userLoginDto) {
        UserResultDto userResultDto = new UserResultDto();

        userResultDto.setStatus("200");
        userResultDto.setMsg("로그인 성공");
        userResultDto.setData(null);

        try {
            String lowerEmail = userLoginDto.getUserEmail().toLowerCase();
            userLoginDto.setUserEmail(lowerEmail);
            int result = mapper.login(userLoginDto);

            if (result != 1) {
                userResultDto.setStatus("404");
                userResultDto.setMsg("ID, PW 미일치");
                userResultDto.setData(null);
            }
        } catch (Exception e) {
            userResultDto.setStatus("500");
            userResultDto.setMsg("로그인 실패");
            userResultDto.setData(null);
        }

        return userResultDto;
    }

    @Override
    public UserResultDto checkDuplicatedNickname(String nickname) {
        UserResultDto userResultDto = new UserResultDto();

        userResultDto.setStatus("200");
        userResultDto.setMsg("닉네임 사용 가능");

        UserDuplicatedDto userDuplicatedDto = new UserDuplicatedDto();
        userDuplicatedDto.setResult(true);

        try {
            int result = mapper.checkNickname(nickname);

            if (result >= 1) {
                userResultDto.setStatus("200");
                userResultDto.setMsg("이미 사용 중");
                userDuplicatedDto.setResult(false);
            }
        } catch (Exception e) {
            userResultDto.setStatus("500");
            userResultDto.setMsg("서버 내부 에러 발생");
            userDuplicatedDto.setResult(false);
        } finally {
            userResultDto.setData(userDuplicatedDto);
        }

        return userResultDto;
    }

    public UserResultDto checkDuplicatedEmail(String email) {
        UserResultDto userResultDto = new UserResultDto();

        userResultDto.setStatus("200");
        userResultDto.setMsg("이메일 사용 가능");

        UserDuplicatedDto userDuplicatedDto = new UserDuplicatedDto();
        userDuplicatedDto.setResult(true);

        try {
            String lowerEmail = email.toLowerCase();
            int result = mapper.checkEmail(lowerEmail);

            if (result >= 1) {
                userResultDto.setStatus("200");
                userResultDto.setMsg("이미 사용 중");
                userDuplicatedDto.setResult(false);
            }
        } catch (Exception e) {
            userResultDto.setStatus("500");
            userResultDto.setMsg("서버 내부 에러 발생");
            userDuplicatedDto.setResult(false);
        } finally {
            userResultDto.setData(userDuplicatedDto);
        }

        return userResultDto;
    }
}
