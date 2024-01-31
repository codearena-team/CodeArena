package com.ssafy.codearena.board.dto;


import lombok.Data;

@Data
public class BoardResultDto {
    private String status;
    private String msg;
    private Object data;
}
