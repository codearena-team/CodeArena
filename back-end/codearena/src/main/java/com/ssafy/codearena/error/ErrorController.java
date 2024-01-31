package com.ssafy.codearena.error;

import com.ssafy.codearena.user.dto.UserResultDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/error")
@Slf4j
public class ErrorController {

    @GetMapping
    public ResponseEntity<UserResultDto> tokenError(HttpServletRequest request) {
        log.info("[ErrorController] response : {} " , (UserResultDto)request.getAttribute("tokenError"));
        return new ResponseEntity<UserResultDto>((UserResultDto)request.getAttribute("tokenError"), HttpStatus.OK);
    }
}
