package com.ssafy.codearena.alarm.dto;

import lombok.Data;

@Data
public class AlarmSendDto {
    private int alarmType;
    private int toId;
    private int fromId;
    private String alarmMsg;
    private String alarmStatus;
}
