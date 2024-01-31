package com.ssafy.codearena.alarm.dto;


import lombok.Data;

@Data
public class AlarmResultDto {
    private String status;
    private String msg;
    private Object data;
}
