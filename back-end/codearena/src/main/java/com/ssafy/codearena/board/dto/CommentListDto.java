package com.ssafy.codearena.board.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "해당하는 게시글의 답글 목록을 불러올 때 사용하는 DTO")
public class CommentListDto {

    @Schema(description = "답글 번호")
    private String commentId;

    @Schema(description = "게시글 번호")
    private String articleNo;

    @Schema(description = "작성자 ID")
    private String writerId;

    @Schema(description = "작성자 닉네임")
    private String writerNickname;

    @Schema(description = "답글 내용")
    private String comment;

    @Schema(description = "답글 코드 블럭")
    private String code;

}
