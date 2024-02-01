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

    @Schema(description = "질문 타입", example = "1 : 질문, 2 : 시간복잡도, 3 : 공간복잡도, 4 : 반례 요청, 5 : 반례")
    private String type;
    
    @Schema(description = "질문 언어")
    private String lang;
    
    @Schema(description = "게시글 내용")
    private String content;

    @Schema(description = "코드")
    private String code;
    
    @Schema(description = "조회수")
    private String hit;

    @Schema(description = "스포방지 여부", example = "1 : 스포방지, 2 : 전체공개")
    private int spoiler;

    @Schema(description = "게시 날짜")
    private String date;

}