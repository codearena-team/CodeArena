package com.ssafy.codearena.board.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "보드 상세조회 DTO")
public class BoardDetailDto {
    
    @Schema(description = "게시글 번호")
    private String articleNo;
    
    @Schema(description = "작성자 ID")
    private String userId;
    
    @Schema(description = "관련 문제 번호")
    private String problemId;
    
    @Schema(description = "제목")
    private String title;
    
    @Schema(description = "질문 언어")
    private String lang;
    
    @Schema(description = "게시글 내용")
    private String content;
    
    @Schema(description = "조회수")
    private String hit;
    
    @Schema(description = "작성일")
    private String date;
}