package com.ssafy.codearena.Chatting.dto;

import lombok.Data;

import java.util.List;


@Data
public class Top5RatingResultDto {
    List<GamePlayerDto> effRank;
    List<GamePlayerDto> speedRank;
}
