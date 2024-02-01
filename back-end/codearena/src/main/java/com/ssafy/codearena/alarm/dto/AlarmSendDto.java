package com.ssafy.codearena.alarm.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "알림 송신 DTO")
public class AlarmSendDto {

    @Schema(description = "알림 타입 >> 1 : 문제 생성 요청, 2 : 문제 수정 요청, 3 : 게임 초대, 4 : 공지사항")
    private int alarmType;

    @Schema(description = "수신자 ID")
    private int toId;

    @Schema(description = "송신자 ID")
    private int fromId;

    @Schema(description = "보내는 내용")
    private String alarmMsg;

    @Schema(description = "알림 상태", defaultValue = "요청 대기", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private String alarmStatus;
}
