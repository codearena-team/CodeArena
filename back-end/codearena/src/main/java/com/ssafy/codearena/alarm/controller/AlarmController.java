package com.ssafy.codearena.alarm.controller;

import com.ssafy.codearena.alarm.dto.AlarmReceiveDto;
import com.ssafy.codearena.alarm.dto.AlarmSendDto;
import com.ssafy.codearena.alarm.service.AlarmService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "알림 API", description = "알림에 관한 Controller **알림 타입 = 1 : 문제 생성 요청, 2 : 문제 수정 요청, 3 : 게임 초대, 4 : 공지사항 **")
@RestController
@RequiredArgsConstructor
@RequestMapping("/alarm")
public class AlarmController {

    private final AlarmService alarmService;

    @Operation(summary = "수신함 리스트", description = "파라미터로 받은 유저가 수신한 알림 목록을 최신순으로 정렬하여 전달")
    @GetMapping("/receive")
    public ResponseEntity<List<AlarmReceiveDto>> receive(@RequestParam String userId) {

        //알람조회 서비스 호출
        return ResponseEntity.ok(alarmService.receive(userId));
    }

    @Operation(summary = "송신함 리스트", description = "파라미터로 받은 유저가 송신한 알림 목록을 최신순으로 정렬하여 전달")
    @GetMapping("/send/list")
    public ResponseEntity<List<AlarmReceiveDto>> sendList(@RequestParam String userId) {

        return ResponseEntity.ok(alarmService.sendList(userId));
    }


    @Operation(summary = "알림 송신", description = "필요 파라미터 : 알림타입, 수신자ID, 송신자ID, 알림내용 || 알림타입이 1 또는 2라면 status=요청 대기, 3,4라면 status=처리 완료")
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


    @Operation(summary = "읽음 처리", description = "파라미터로 받은 알림ID에 해당하는 알림의 읽음여부 true 처리")
    @PutMapping("readChange")
    public ResponseEntity<?> readChange(@RequestParam String alarmId) {

        alarmService.readChange(alarmId);
        return ResponseEntity.status(200).body("읽음 처리 되었습니다.");
    }


    @Operation(summary = "알림 상세 내용 조회", description = "파라미터로 받은 알림ID에 해당하는 상세 내용 전달")
    @GetMapping("detail")
    public ResponseEntity<AlarmReceiveDto> detail(@RequestParam String alarmId) {

        return ResponseEntity.ok(alarmService.detail(alarmId));
    }

    @Operation(summary = "알림 상태 변경", description = "요청 파라미터 : 알림ID, 변경할 상태 명 || 상태 명의 경우 String으로 프론트 프로토콜을 따라감")
    @PutMapping("statusChange")
    public ResponseEntity<?> statusChange(@RequestParam String alarmId, String alarmStatus) {

        alarmService.statusChange(alarmId, alarmStatus);
        return ResponseEntity.status(200).body("상태 변경이 완료되었습니다.");
    }

}
