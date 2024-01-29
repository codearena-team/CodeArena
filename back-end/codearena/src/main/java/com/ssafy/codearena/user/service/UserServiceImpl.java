package com.ssafy.codearena.user.service;

import com.ssafy.codearena.user.dto.*;
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

//    @Override
//    public UserResultDto reissue(UserReissueDto userReissueDto) {
//        UserResultDto userResultDto = new UserResultDto();
//
//        userResultDto.setStatus("200");
//        userResultDto.setMsg("비밀번호 변경 후 이메일 전송 완료");
//        userResultDto.setData(null);
//
//        try {
//            String tempPassword = getTempPassword();
//            userReissueDto.setTempPassword(tempPassword);
//
//            int result = mapper.reissue(userReissueDto);
//
//            if (result == 1) {
//                // 이메일 전송 로직
//
//                MailDto mailDto = new MailDto();
//                mailDto.setAddress(userReissueDto.getUserEmail());
//                mailDto.setTitle("[Code Arena] 임시 비밀번호 발급");
//                mailDto.setMessage("Code Arena 임시 비밀번호 발급 안내 이메일입니다. " + "회원님의 임시 비밀번호는 " + tempPassword + " 입니다. " + "로그인 후에 비밀번호를 변경해주세요!");
//
//
//            } else {
//                userResultDto.setStatus("404");
//                userResultDto.setMsg("해당 유저 없음");
//            }
//
//        } catch (Exception e) {
//            userResultDto.setStatus("500");
//            userResultDto.setMsg("수정, 이메일 전송 실패");
//        }
//
//        return userResultDto;
//    }
//
//    // 비밀번호 랜덤 생성 로직
//    public static String getTempPassword(){
//        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
//                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };
//
//        String str = "";
//
//        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
//        int idx = 0;
//        for (int i = 0; i < 10; i++) {
//            idx = (int) (charSet.length * Math.random());
//            str += charSet[idx];
//        }
//        return str;
//    }
//
//    public void mailSend(MailDto mailDto) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(mailDto.getAddress());
//        message.setSubject(mailDto.getTitle());
//        message.setText(mailDto.getMessage());
//        message.setFrom("wisejohn950330@gmail.com");
//        message.setReplyTo("wisejohn950330@gmail.com");
//        System.out.println("message"+message);
//        javaMailSender.send(message);
//    }
}
