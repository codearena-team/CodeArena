package com.ssafy.codearena.board.dto;

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

    @Schema(description = "사용 언어 (ex : Python)")
    private String lang;

    @Schema(description = "질문 내용")
    private String content;

//    private String hit;
//    private String date;
}
