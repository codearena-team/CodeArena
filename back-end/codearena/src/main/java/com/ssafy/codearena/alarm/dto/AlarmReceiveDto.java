package com.ssafy.codearena.alarm.dto;

import lombok.Data;

@Data
public class AlarmReceiveDto {
    private int alarmId;
    private int alarmType;
    private int toId;
    private int fromId;
    private String alarmMsg;
    private String isRead;
    private String alarmDate;
    private String alarmStatus;

}
