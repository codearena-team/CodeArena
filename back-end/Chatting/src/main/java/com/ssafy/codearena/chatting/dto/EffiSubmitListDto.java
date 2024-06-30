package com.ssafy.codearena.chatting.dto;

import lombok.Data;

import java.util.List;

@Data
public class EffiSubmitListDto {
    private int currentPage;
    private int totalPageCount;
    private List<CompetitiveGameSubmitDto> list;
}
