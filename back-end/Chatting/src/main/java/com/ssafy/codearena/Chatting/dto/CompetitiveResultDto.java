package com.ssafy.codearena.Chatting.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "경쟁 게임 결과 조회 DTO")
@Data
public class CompetitiveResultDto {
    @Schema(description = "게임방 ID")
    private String gameId;
    @Schema(description = "문제 번호")
    private String problemId;
    @Schema(description = "게임방 제목")
    private String gameTitle;
    @Schema(description = "시작 시각")
    private String startTime;
    @Schema(description = "종료 시각")
    private String endTime;
    @Schema(description = "게임 모드 2가지 ( 0 : 스피드전, 1 : 효율전")
    private String gameMode;
    @Schema(description = "게임 진행 언어")
    private String gameLang;
    @Schema(description = "이긴 사람의 닉네임, 무승부 시 '무승부' String값 반환")
    private String winner;
    @Schema(description = "게임방 종류 2가지 ( 0 : 경쟁, 1 : 사설")
    private String roomType;
    @Schema(description = "플레이어 1 ID값(int)")
    private String player1Id;
    @Schema(description = "플레이어 2 ID값(int)")
    private String player2Id;
    @Schema(description = "플레이어 1 썸네일")
    private String player1Ssumnail;
    @Schema(description = "플레이어 2 썸네일")
    private String player2Ssumnail;
    @Schema(description = "플레이어 1 닉네임")
    private String player1Nickname;
    @Schema(description = "플레이어 2 닉네임")
    private String player2Nickname;

    @Schema(description = "플레이어 1 레이팅 (게임 모드에 따른 레이팅값")
    private String player1Rating;
    @Schema(description = "플레이어 2 레이팅 (게임 모드에 따른 레이팅값")
    private String player2Rating;
}
