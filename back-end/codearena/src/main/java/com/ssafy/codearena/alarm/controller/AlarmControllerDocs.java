package com.ssafy.codearena.alarm.controller;

import com.ssafy.codearena.alarm.dto.AlarmResultDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Tag(name = "알림 API", description = "알림에 관한 Controller **알림 타입 = 1 : 문제 생성 요청, 2 : 문제 수정 요청, 3 : 게임 초대, 4 : 공지사항 **")
public interface AlarmControllerDocs {

    @Operation(summary = "수신함 리스트", description = "파라미터로 받은 유저가 수신한 알림 목록을 최신순으로 정렬하여 전달")
    @Parameters(value = {
            @Parameter(name = "userId", description = "수신함 조회를 위한 유저 아이디")
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "수신함 조회 성공", headers = @Header(name = AUTHORIZATION, description = "Access Token")),
    })
    public ResponseEntity<AlarmResultDto> receive(@RequestParam String userId);

}
