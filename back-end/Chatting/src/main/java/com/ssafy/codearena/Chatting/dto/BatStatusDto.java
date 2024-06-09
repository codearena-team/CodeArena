package com.ssafy.codearena.Chatting.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class BatStatusDto {
    @Schema(description = "플레이어1에 대한 배팅 비율")
    private String player1Ratio;
    @Schema(description = "플레이어2에 대한 배팅 비율")
    private String player2Ratio;
    @Schema(description = "플레이어1에 투자한 사람의 총합")
    private String player1BatPeople;
    @Schema(description = "플레이어2에 투자한 사람의 총합")
    private String player2BatPeople;
    @Schema(description = "플레이어1에 대한 배팅 최고 금액")
    private String player1MaxCoin;
    @Schema(description = "플레이어2에 대한 배팅 최고 금액")
    private String player2MaxCoin;
    @Schema(description = "플레이어1에 대한 최고 금액을 배팅한 유저의 닉네임")
    private String player1MaxUserNickname;
    @Schema(description = "플레이어2에 대한 최고 금액을 배팅한 유저의 닉네임")
    private String player2MaxUserNickname;
}
