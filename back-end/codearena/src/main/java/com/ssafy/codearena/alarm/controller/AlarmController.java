package com.ssafy.codearena.alarm.controller;

import com.ssafy.codearena.alarm.dto.AlarmReceiveDto;
import com.ssafy.codearena.alarm.dto.AlarmResultDto;
import com.ssafy.codearena.alarm.dto.AlarmSendDto;
import com.ssafy.codearena.alarm.service.AlarmService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/alarm")
public class AlarmController implements AlarmControllerDocs{

    private final AlarmService alarmService;


    @GetMapping("/receive")
    public ResponseEntity<AlarmResultDto> receive(@RequestParam String userId) {

        //알람조회 서비스 호출
        return new ResponseEntity<AlarmResultDto>(alarmService.receive(userId),HttpStatus.OK);
    }

    @GetMapping("/send/list")
    public ResponseEntity<AlarmResultDto> sendList(@RequestParam String userId) {

        return new ResponseEntity<AlarmResultDto>(alarmService.sendList(userId), HttpStatus.OK);
    }


    @PostMapping("/send")
    public ResponseEntity<?> send(@RequestBody AlarmSendDto alarmSendDto) {

        return new ResponseEntity<AlarmResultDto>(alarmService.send(alarmSendDto), HttpStatus.OK);
    }


    @PutMapping("readChange")
    public ResponseEntity<?> readChange(@RequestParam String alarmId) {

        return new ResponseEntity<AlarmResultDto>(alarmService.readChange(alarmId), HttpStatus.OK);
    }


    @GetMapping("detail")
    public ResponseEntity<?> detail(@RequestParam String alarmId) {

        return new ResponseEntity<AlarmResultDto>(alarmService.detail(alarmId), HttpStatus.OK);
    }

    @PutMapping("statusChange")
    public ResponseEntity<?> statusChange(@RequestParam String alarmId, String alarmStatus) {

        return new ResponseEntity<AlarmResultDto>(alarmService.statusChange(alarmId, alarmStatus), HttpStatus.OK);
    }

}
