package com.ssafy.codearena.user.service;

import com.ssafy.codearena.user.dto.*;
import com.ssafy.codearena.user.mapper.UserMapper;
import com.ssafy.codearena.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{

    private final UserMapper mapper;
    private final JavaMailSender javaMailSender;
    private final JwtUtil jwtUtil;
    private final String HEADER_AUTH = "Authorization";

    @Override
    public void saveRefreshToken(String userEmail, String refreshToken) {

        Map<String ,String> map = new HashMap<String, String>();

        map.put("userEmail", userEmail);
        map.put("refreshToken", refreshToken);
        try {
            mapper.saveRefreshToken(map);
        } catch (Exception e) {
            log.error("[UserServiceImpl] saveRefreshToken 저장 에러 : {}" , e.getMessage());
        }
    }

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
    public UserResultDto login(HttpServletResponse response, UserLoginDto userLoginDto) {

        log.debug("login userEmail : {}", userLoginDto.getUserEmail());

        UserResultDto userResultDto = new UserResultDto();

        userResultDto.setStatus("200");
        userResultDto.setMsg("로그인 성공");
        userResultDto.setData(null);

        try {
            String lowerEmail = userLoginDto.getUserEmail().toLowerCase();
            userLoginDto.setUserEmail(lowerEmail);
            TokenDataDto tokenDataDto = mapper.login(userLoginDto);
            log.info("[UserLogin] : {}" , tokenDataDto);

            // 로그인 성공 시
            if (tokenDataDto != null) {

                String accessToken = jwtUtil.createAccessToken(tokenDataDto);
                String refreshToken = jwtUtil.createRefreshToken(tokenDataDto);

                log.debug("access token : {}", accessToken);
                log.debug("refresh token : {}", refreshToken);

                saveRefreshToken(userLoginDto.getUserEmail(), refreshToken);

                UserTokenDto userTokenDto = new UserTokenDto(refreshToken);

                response.setHeader(HEADER_AUTH, accessToken);

                userResultDto.setData(userTokenDto);
            } else {
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

    @Override
    public UserResultDto reissue(UserReissueDto userReissueDto) {
        UserResultDto userResultDto = new UserResultDto();

        userResultDto.setStatus("200");
        userResultDto.setMsg("비밀번호 변경 후 이메일 전송 완료");
        userResultDto.setData(null);

        try {
            String tempPassword = getTempPassword();
            userReissueDto.setTempPassword(tempPassword);

            int result = mapper.reissue(userReissueDto);

            if (result == 1) {
                // 이메일 전송 로직

                MailDto mailDto = new MailDto();
                mailDto.setAddress(userReissueDto.getUserEmail());
                mailDto.setTitle("[Code Arena] 임시 비밀번호 발급");
                mailDto.setMessage("Code Arena 임시 비밀번호 발급 안내 이메일입니다. " + "회원님의 임시 비밀번호는 " + tempPassword + " 입니다. " + "로그인 후에 비밀번호를 변경해주세요!");

                mailSend(mailDto);

            } else {
                userResultDto.setStatus("404");
                userResultDto.setMsg("해당 유저 없음");
            }

        } catch (Exception e) {
            userResultDto.setStatus("500");
            userResultDto.setMsg("수정, 이메일 전송 실패");
        }

        return userResultDto;
    }

    // 비밀번호 랜덤 생성 로직
    public static String getTempPassword(){
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

    public void mailSend(MailDto mailDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailDto.getAddress());
        message.setSubject(mailDto.getTitle());
        message.setText(mailDto.getMessage());
        message.setFrom("timber3597@naver.com");
        message.setReplyTo("timber3597@naver.com");
        System.out.println("message"+message);
        javaMailSender.send(message);
    }

    @Override
    public UserResultDto searchUser(String userNickname) {

        UserResultDto userResultDto = new UserResultDto();
        userResultDto.setStatus("200");
        userResultDto.setMsg("회원 정보 조회 성공");

        UserSearchDto userSearchDto = new UserSearchDto();
        UserInfoDto userInfoDto = null;

        try {
            userInfoDto = mapper.searchUser(userNickname);

            System.out.println(userInfoDto);
            // 검색된 회원이 없을 시
            if (userInfoDto == null) {
                userResultDto.setStatus("404");
                userResultDto.setMsg("해당 이름의 회원 없음");
                userResultDto.setData(null);
            } else {
                ArrayList<Integer> solvedProblem = mapper.getSolvedProblem(userInfoDto.getUserId());
                ArrayList<Integer> wrongProblem = mapper.getWrongProblem(userInfoDto.getUserId());

                System.out.println("solvedProblem = " + solvedProblem);
                System.out.println("wrongProblem = " + wrongProblem);

                userSearchDto.setUserInfoDto(userInfoDto);
                // 1. 회원이 푼 문제
                userSearchDto.setSolvedProblem(solvedProblem);
                // 2. 회원이 틀린 문제
                userSearchDto.setWrongProblem(wrongProblem);
                // 3. CntOfCate
                // 일단 지금은 null 상태로 두기
                userSearchDto.setCntOfCate(null);

                userResultDto.setData(userSearchDto);
            }
        } catch (Exception e) {
            e.printStackTrace();
            userResultDto.setStatus("500");
            userResultDto.setMsg("서버 내부 에러");
            userResultDto.setData(null);
        }
        return userResultDto;
    }

    @Override
    public UserResultDto changePassword(UserChangePasswordDto userChangePasswordDto) {
        UserResultDto userResultDto = new UserResultDto();

        userResultDto.setStatus("200");
        userResultDto.setMsg("비밀번호 변경 완료");
        userResultDto.setData(null);

        try {
            String lowerEmail = userChangePasswordDto.getUserEmail().toLowerCase();
            userChangePasswordDto.setUserEmail(lowerEmail);
            int result = mapper.changePassword(userChangePasswordDto);

            if (result != 1) {
                userResultDto.setStatus("404");
                userResultDto.setMsg("해당 사용자 없음!");
            }
        } catch (Exception e) {
            userResultDto.setStatus("500");
            userResultDto.setMsg("서버 내부 에러 발생");
        }
        return userResultDto;
    }



}
