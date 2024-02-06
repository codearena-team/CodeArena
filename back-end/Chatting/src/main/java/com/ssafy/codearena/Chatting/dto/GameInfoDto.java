package com.ssafy.codearena.Chatting.dto;

import lombok.Data;

@Data
public class GameInfoDto {
    private String gameId;  //게임방 ID
    private String title;    //게임방 제목
    private String userRed;   //플레이어 1
    private String userBlue;   //플레이어 2
    private String problemId;   //배정된 랜덤 문제 번호
    private String gameMode;    //게임 모드 2가지 (스피드전, 효율전)
    private int participants;    //채팅 참여자 수
    private String startTime;   //게임 시작 시간
    private String language;    //게임 사용 언어
}