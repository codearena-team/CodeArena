package com.ssafy.codearena.board.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "게시글 리스트 조회 DTO")
public class BoardListDto {

    @Schema(description = "게시글 목록")
    private List<BoardDetailDto> articles;

    @Schema(description = "현재 페이지 번호")
    private int currentPage;

    @Schema(description = "전체 페이지 개수")
    private int totalPageCount;
}
