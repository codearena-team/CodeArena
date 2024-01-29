package com.ssafy.codearena.alarm.controller;

import com.ssafy.codearena.alarm.dto.AlarmReceiveDto;
import com.ssafy.codearena.alarm.dto.AlarmSendDto;
import com.ssafy.codearena.alarm.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/alarm")
public class AlarmController {

    private final AlarmService alarmService;


    @GetMapping("/receive")
    public ResponseEntity<List<AlarmReceiveDto>> receive(@RequestParam String userId) {

        //알람조회 서비스 호출
        return ResponseEntity.ok(alarmService.receive(userId));
    }

    @PostMapping("/send")
    public ResponseEntity<?> send(@RequestBody AlarmSendDto alarmSendDto) {
        if(alarmSendDto.getAlarmType() == 1 || alarmSendDto.getAlarmType() == 2) {
            alarmSendDto.setAlarmStatus("요청 대기");
        }
        else {
            alarmSendDto.setAlarmStatus("처리 완료");
        }

        int cnt = alarmService.send(alarmSendDto);

        if(cnt == 1) {
            return ResponseEntity.ok("알림이 성공적으로 보내졌습니다.");
        }

        return (ResponseEntity<?>) ResponseEntity.badRequest();
    }

}
