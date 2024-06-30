package com.ssafy.codearena.chatting.dto;

import lombok.Data;

@Data
public class PrivateGameCreateDto {
    private String gameId;  //게임방 ID
    private String title;    //게임방 제목
    private String userId;   //방장 ID
    private String gameMode;    //게임 모드 2가지 (스피드전, 효율전)
    private String language;    //게임 사용 언어
    private String roomType;    //방 타입 2가지 (경쟁, 사설)

}
