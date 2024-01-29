package com.ssafy.codearena.user.controller;

import com.ssafy.codearena.user.dto.UserJoinDto;
import com.ssafy.codearena.user.dto.UserLoginDto;
import com.ssafy.codearena.user.dto.UserResultDto;
import com.ssafy.codearena.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
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
    public ResponseEntity<UserResultDto> login(@RequestBody UserLoginDto userLoginDto) {
        return new ResponseEntity<UserResultDto>(userService.login(userLoginDto), HttpStatus.OK);
    }



}
