package com.ssafy.codearena.Chatting.controller;

import com.ssafy.codearena.Chatting.dto.RestResultDto;
import com.ssafy.codearena.Chatting.dto.SubmitDto;
import com.ssafy.codearena.Chatting.service.RestService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/rest")
@RequiredArgsConstructor
public class GameRestController {

    private final RestService service;
    @PostMapping("/submit")
    ResponseEntity<RestResultDto> submitEff(@RequestBody SubmitDto submitDto) {
        // roomType 0 : 경쟁, roomType : 1 사설
        RestResultDto resultDto = service.insertSubmit(submitDto);
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

    @GetMapping("/rank")
    ResponseEntity<RestResultDto> getRanking(){
        RestResultDto resultDto = service.getRanking();
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }

    @GetMapping("/user/record")
    ResponseEntity<RestResultDto> getUserRecord(HttpServletRequest request){
        RestResultDto resultDto = service.getMyRecord(request);
        return new ResponseEntity<>(resultDto, HttpStatus.OK);
    }
}
