package com.ssafy.codearena.user.service;

import com.ssafy.codearena.problem.dto.ProblemForInsertDto;
import com.ssafy.codearena.problem.dto.SolveAndUnsolveDto;
import com.ssafy.codearena.problem.service.ProblemService;
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
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{

    private final ProblemService problemService;
    private final UserMapper mapper;
    private final JavaMailSender javaMailSender;
    private final JwtUtil jwtUtil;
    private final String HEADER_AUTH = "Authorization";

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
    public UserResultDto logout(String userEmail) {
        UserResultDto userResultDto = new UserResultDto();
        userResultDto.setMsg("200");
        userResultDto.setMsg("로그아웃 성공");
        userResultDto.setData(null);

        try {
            int result = mapper.logout(userEmail);

            if (result != 1) {
                userResultDto.setStatus("404");
                userResultDto.setMsg("해당 유저 없음");
            }
        } catch (Exception e) {
            userResultDto.setStatus("500");
            userResultDto.setMsg("서버 에러 발생");
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
    public UserResultDto searchUser(UserSearchDto userSearchDto) {

        UserResultDto userResultDto = new UserResultDto();
        userResultDto.setStatus("200");
        userResultDto.setMsg("회원 정보 조회 성공");

        try {
            String userNickname = userSearchDto.getFromUserNickname();
            UserInfoDto fromUser = mapper.searchUser(userNickname);
            userNickname = userSearchDto.getToUserNickname();
            UserInfoDto toUser = mapper.searchUser(userNickname);

            // 검색된 회원이 없을 시
            if ("".equals(fromUser.getUserId()) || fromUser.getUserId() == null || "".equals(toUser.getUserId()) || toUser.getUserId() == null) {
                userResultDto.setStatus("404");
                userResultDto.setMsg("해당 이름의 회원 없음");
                userResultDto.setData(null);
            } else {
                // 푼 문제 가져오기
                // 못 푼 문제 가져오기
                UserSearchResultDto userSearchResultDto = new UserSearchResultDto();

                SolveAndUnsolveDto solveAndUnsolveDto = problemService.getSolveAndUnsolveList(toUser.getUserNickname());
                List<UserProblemCateDto> problemCateList = problemService.getProblemCateList(toUser.getUserNickname());

                List<ProblemForInsertDto> solveListP = solveAndUnsolveDto.getSolveList();
                List<ProblemForInsertDto> unsolveListP = solveAndUnsolveDto.getUnSolveList();

                List<UserProblemDto> solveListU = new ArrayList<>();
                List<UserProblemDto> unsolveListU = new ArrayList<>();


                for(ProblemForInsertDto p : solveListP) {
                    UserProblemDto dto = new UserProblemDto();
                    dto.setProblemId(p.getProblemId());
                    dto.setProblemTitle(p.getProblemTitle());
                    solveListU.add(dto);
                }

                for(ProblemForInsertDto p : unsolveListP) {
                    UserProblemDto dto = new UserProblemDto();
                    dto.setProblemId(p.getProblemId());
                    dto.setProblemTitle(p.getProblemTitle());
                    unsolveListU.add(dto);
                }

                UserProblemDto userSolvedProblemDto = new UserProblemDto();

                int isFollow = mapper.isFollow(userSearchDto);
                toUser.setIsFollow(isFollow);

                // 1. 검색 대상 기본 정보 넣기
                userSearchResultDto.setUserInfoDto(toUser);
                // 2. 검색 대상이 푼 문제 리스트 넣기
                userSearchResultDto.setSolvedProblem(solveListU);
                // 3. 검색 대상이 못 푼 문제 리스트 넣기
                userSearchResultDto.setUnsolvedProblem(unsolveListU);
                // 4. 푼 문제들의 카테고리별 개수를 넣어 주기
                userSearchResultDto.setProblemCateList(problemCateList);

                userResultDto.setData(userSearchResultDto);
            }
        } catch (Exception e) {
            log.debug("Error occured : {} ", e);
            userResultDto.setStatus("500");
            userResultDto.setMsg("서버 내부 에러");
            userResultDto.setData(null);
        }
        return userResultDto;
    }

    @Override
    public UserResultDto searchUserList(UserSearchListDto userSearchListDto) {
        ArrayList<UserSearchResultListDto> userSearchList = new ArrayList<>();

        UserResultDto userResultDto = new UserResultDto();
        userResultDto.setStatus("200");
        userResultDto.setMsg("유저 리스트 검색 완료");

        try {
            userSearchList = mapper.searchUserList(userSearchListDto);
            userResultDto.setData(userSearchList);
        } catch (Exception e) {
            log.debug("Exception : {}" , e);
            userResultDto.setStatus("500");
            userResultDto.setMsg("서버 내부 에러");
        }

        userResultDto.setData(userSearchList);
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

    @Override
    public UserResultDto changeUserInfo(UserChangeInfoDto userChangeInfoDto) {
        UserResultDto userResultDto = new UserResultDto();
        userResultDto.setStatus("200");
        userResultDto.setMsg("변경사항 저장 완료");
        userResultDto.setData(null);

        try {
            int result = mapper.changeUserInfo(userChangeInfoDto);

            if(result != 1) {
                userResultDto.setStatus("404");
                userResultDto.setMsg("해당 ID의 유저 없음");
            }
        } catch (Exception e) {
            userResultDto.setStatus("500");
            userResultDto.setMsg("서버 에러 발생");
        }

        return userResultDto;
    }

    @Override
    public UserResultDto follow(UserFollowDto userFollowDto) {
        UserResultDto userResultDto = new UserResultDto();
        userResultDto.setStatus("200");
        userResultDto.setMsg("회원 팔로우 성공");
        userResultDto.setData(null);

        try {
            mapper.follow(userFollowDto);
        } catch (Exception e) {
            log.debug("Exception : {}", e);
            userResultDto.setStatus("500");
            userResultDto.setMsg("서버 내부 에러");
        }

        return userResultDto;
    }

    @Override
    public UserResultDto unfollow(UserFollowDto userFollowDto) {
        UserResultDto userResultDto = new UserResultDto();
        userResultDto.setStatus("200");
        userResultDto.setMsg("팔로우 취소 성공");
        userResultDto.setData(null);

        try {
            mapper.unfollow(userFollowDto);
        } catch (Exception e) {
            userResultDto.setStatus("500");
            userResultDto.setMsg("서버 내부 에러");
        }
        return userResultDto;
    }

    @Override
    public UserResultDto getFollowList(String userId) {
        UserResultDto userResultDto = new UserResultDto();
        userResultDto.setStatus("200");
        userResultDto.setMsg("팔로우 목록 조회 성공");
        userResultDto.setData(null);

        try {
            ArrayList<UserFollowInfoDto> result = mapper.getFollowList(userId);

            userResultDto.setData(result);
        } catch (Exception e) {
            userResultDto.setStatus("500");
            userResultDto.setMsg("팔로우 목록 조회 실패");
        }
        return userResultDto;
    }

    @Override
    public UserResultDto getFollowingList(String userId) {
        UserResultDto userResultDto = new UserResultDto();
        userResultDto.setStatus("200");
        userResultDto.setMsg("팔로잉 목록 조회 성공");
        userResultDto.setData(null);

        try {
            ArrayList<UserFollowingInfoDto> result = mapper.getFollowingList(userId);
            userResultDto.setData(result);

        } catch (Exception e) {
            userResultDto.setStatus("500");
            userResultDto.setMsg("서버 에러 발생");
        }

        return userResultDto;
    }
}
