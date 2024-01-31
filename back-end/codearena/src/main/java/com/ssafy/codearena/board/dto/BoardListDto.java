package com.ssafy.codearena.board.dto;

import lombok.Data;

import java.util.List;

@Data
public class BoardListDto {
    private List<BoardDetailDto> articles;
    private int currentPage;
    private int totalPageCount;
}
