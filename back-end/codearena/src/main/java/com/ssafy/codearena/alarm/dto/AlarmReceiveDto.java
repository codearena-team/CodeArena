package com.ssafy.codearena.alarm.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "수신함 조회 시 사용되는 DTO")
public class AlarmReceiveDto {

    @Schema(description = "알림 번호")
    private int alarmId;

    @Schema(description = "알림 타입 >> 1 : 문제 생성 요청, 2 : 문제 수정 요청, 3 : 게임 초대, 4 : 공지사항")
    private int alarmType;

    @Schema(description = "수신자 닉네임")
    private String toNickname;

    @Schema(description = "송신자 닉네임")
    private String fromNickname;

    @Schema(description = "알림 내용")
    private String alarmMsg;

    @Schema(description = "읽음 여부", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private String isRead;

    @Schema(description = "알림 송신 날짜", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private String alarmDate;

    @Schema(description = "알림 상태", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private String alarmStatus;

}
