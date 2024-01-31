package com.ssafy.codearena.board.dto;

import lombok.Data;

@Data
public class BoardWriteDto {
//    private String articleNo;
    private String userId;
    private String problemId;
    private String title;
    private String lang;
    private String content;
//    private String hit;
//    private String date;
}
