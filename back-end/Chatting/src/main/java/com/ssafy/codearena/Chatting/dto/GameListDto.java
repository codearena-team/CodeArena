package com.ssafy.codearena.Chatting.dto;

import lombok.Data;

import java.util.List;

@Data
public class GameListDto {
    private List<GameInfoDto> gameRooms;
    private int CurrentPage;
    private int TotalPageCount;
}
