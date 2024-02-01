package com.ssafy.codearena.auth.controller;

import com.ssafy.codearena.auth.dto.AuthResultDto;
import com.ssafy.codearena.auth.dto.RenewTokenDto;
import com.ssafy.codearena.auth.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping
    public ResponseEntity<AuthResultDto> checkToken(HttpServletRequest request) {
        return new ResponseEntity<>(authService.check(request), HttpStatus.OK);
    }

    @PostMapping("/renew")
    public ResponseEntity<AuthResultDto> renewAccessToken(HttpServletResponse response, @RequestBody RenewTokenDto renewTokenDto) {
        return new ResponseEntity<>(authService.renewAccessToken(response, renewTokenDto), HttpStatus.OK);
    }

}
