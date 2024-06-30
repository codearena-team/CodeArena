package com.ssafy.codearena.chatting.dto;


import lombok.Data;

@Data
public class RestResultDto {
    String status;
    String msg;
    Object data;
}
