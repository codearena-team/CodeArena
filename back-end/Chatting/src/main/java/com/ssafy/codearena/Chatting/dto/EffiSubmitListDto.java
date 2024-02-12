package com.ssafy.codearena.Chatting.dto;

import lombok.Data;

import java.util.List;

@Data
public class EffiSubmitListDto {
    private int currentPage;
    private int totalPageCount;
    private List<CompetitiveGameSubmitDto> list;
}
