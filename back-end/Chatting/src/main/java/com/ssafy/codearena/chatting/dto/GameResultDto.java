package com.ssafy.codearena.chatting.dto;

import lombok.Data;

@Data
public class GameResultDto {
    private String status;
    private String msg;
    private Object data;
}