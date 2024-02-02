package com.ssafy.codearena.user.controller;

import com.ssafy.codearena.user.dto.*;
import com.ssafy.codearena.user.service.UserService;
import com.ssafy.codearena.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {

    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<UserResultDto> join(@RequestBody UserJoinDto userJoinDto) {
        return new ResponseEntity<UserResultDto>(userService.join(userJoinDto), HttpStatus.OK);
    }
    @GetMapping("/nick/duplicate")
    public ResponseEntity<UserResultDto> checkDuplicatedNickname(@RequestParam String userNickname) {
        return new ResponseEntity<UserResultDto>(userService.checkDuplicatedNickname(userNickname), HttpStatus.OK);
    }
    @GetMapping("/email/duplicate")
    public ResponseEntity<UserResultDto> checkDuplicatedEmail(@RequestParam String userEmail) {
        return new ResponseEntity<UserResultDto>(userService.checkDuplicatedEmail(userEmail), HttpStatus.OK);
    }
    @PostMapping("/login")
    public ResponseEntity<UserResultDto> login(HttpServletResponse response, @RequestBody UserLoginDto userLoginDto) {
        return new ResponseEntity<UserResultDto>(userService.login(response, userLoginDto), HttpStatus.OK);
    }
    @PostMapping("/logout")
    public ResponseEntity<UserResultDto> logout(@RequestBody String userEmail) {
        return new ResponseEntity<UserResultDto>(userService.logout(userEmail), HttpStatus.OK);
    }
    @GetMapping("/password/reissue")
    public ResponseEntity<UserResultDto> reissue(@RequestBody UserReissueDto userReissueDto) {
        return new ResponseEntity<UserResultDto>(userService.reissue(userReissueDto), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<UserResultDto> searchUser(@RequestParam String userNickname) {
        return new ResponseEntity<UserResultDto>(userService.searchUser(userNickname) ,HttpStatus.OK);
    }
    @PutMapping("/password")
    public ResponseEntity<UserResultDto> changePassword(@RequestBody UserChangePasswordDto userChangePasswordDto) {
        return new ResponseEntity<UserResultDto>(userService.changePassword(userChangePasswordDto), HttpStatus.OK);
    }
    @PutMapping
    public ResponseEntity<UserResultDto> changeUserInfo(@RequestBody UserChangeInfoDto userChangeInfoDto) {
        return new ResponseEntity<UserResultDto>(userService.changeUserInfo(userChangeInfoDto), HttpStatus.OK);
    }


}
