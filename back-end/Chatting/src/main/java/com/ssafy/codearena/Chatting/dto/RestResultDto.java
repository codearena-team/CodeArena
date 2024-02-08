package com.ssafy.codearena.Chatting.dto;


import lombok.Data;

@Data
public class RestResultDto {
    String status;
    String msg;
    Object data;
}
