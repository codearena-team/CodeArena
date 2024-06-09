package com.ssafy.codearena.alarm.controller;

import com.ssafy.codearena.alarm.dto.AlarmReceiveDto;
import com.ssafy.codearena.alarm.dto.AlarmResultDto;
import com.ssafy.codearena.alarm.dto.AlarmSendDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Tag(name = "알림 API", description = "알림에 관한 Controller **알림 타입 = 1 : 문제 생성 요청, 2 : 문제 수정 요청, 3 : 게임 초대, 4 : 공지사항 **")
public interface AlarmControllerDocs {

    @Operation(summary = "수신함 리스트", description = "파라미터로 받은 유저가 수신한 알림 목록을 최신순으로 정렬하여 전달")
    @Parameters(value = {
            @Parameter(name = "userId", description = "수신함 조회를 위한 유저 아이디")
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "수신함 조회 성공", content = @Content(schema = @Schema(implementation = AlarmReceiveDto.class))),
    })
    public ResponseEntity<AlarmResultDto> receive(@RequestParam String userId);


    @Operation(summary = "송신함 리스트", description = "파라미터로 받은 유저가 송신한 알림 목록을 최신순으로 정렬하여 전달")
    @Parameter(name = "userId", description = "송신함 조회를 위한 유저 아이디")
    public ResponseEntity<AlarmResultDto> sendList(@RequestParam String userId);


    @Operation(summary = "읽음 처리", description = "파라미터로 받은 알림ID에 해당하는 알림의 읽음여부 true 처리")
    @Parameter(name = "alarmId", description = "읽음처리 시킬 알림의 번호")
    public ResponseEntity<?> readChange(@RequestParam String alarmId);


    @Operation(summary = "알림 상세 내용 조회", description = "파라미터로 받은 알림ID에 해당하는 상세 내용 전달")
    @Parameter(name = "alarmId", description = "조회할 알림의 번호")
    public ResponseEntity<?> detail(@RequestParam String alarmId);

    @Operation(summary = "알림 상태 변경", description = "요청 파라미터 : 알림ID, 변경할 상태 명 || 상태 명의 경우 String으로 프론트 프로토콜을 따라감")
    @Parameter(name = "alarmId", description = "상태 변경 할 알림의 번호")
    @Parameter(name = "alarmStatus", description = "처리할 상태의 값")
    public ResponseEntity<?> statusChange(@RequestParam String alarmId, String alarmStatus);

    @Parameters(value = {
            @Parameter(name = "alarmType", description = "보내는 알림의 타입"),
            @Parameter(name = "toId", description = "받는 유저의 아이디"),
            @Parameter(name = "fromId", description = "보내는 유저의 아이디"),
            @Parameter(name = "alarmMsg", description = "알림의 내용"),
            @Parameter(name = "alarmStatus", description = "알림의 처리상태, Required = false || 요청 시 보내지 않아도 자동 처리됨.")
    })
    @Operation(summary = "알림 송신", description = "필요 파라미터 : 알림타입, 수신자ID, 송신자ID, 알림내용 || 알림타입이 1 또는 2라면 status=요청 대기, 3,4라면 status=처리 완료")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "알림 송신 완료", content = @Content(schema = @Schema(implementation = AlarmSendDto.class)))
    })
    public ResponseEntity<?> send(AlarmSendDto alarmSendDto);
}
