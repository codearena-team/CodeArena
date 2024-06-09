package com.ssafy.codearena.board.dto;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "게시글 작성 DTO")
public class BoardWriteDto {
//    private String articleNo;

    @Schema(description = "작성자 ID")
    private String userId;

    @Schema(description = "문제 ID")
    private String problemId;

    @Schema(description = "제목")
    private String title;

    @Parameter(description = "질문 타입", example = "1 : 질문, 2 : 시간복잡도, 3 : 공간복잡도, 4 : 반례 요청, 5 : 반례")
    private String type;

    @Schema(description = "사용 언어", example = "python, c++, java")
    private String lang;

    @Schema(description = "질문 내용")
    private String content;

    @Schema(description = "코드")
    private String code;

    @Schema(description = "스포 방지 여부", example = "1 : 스포방지, 2 : 전체공개")
    private int spoiler;

//    private String hit;
//    private String date;
}
