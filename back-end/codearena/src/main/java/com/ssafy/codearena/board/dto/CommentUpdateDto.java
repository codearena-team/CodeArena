package com.ssafy.codearena.board.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "답글 수정을 위한 DTO")
public class CommentUpdateDto {

    @Schema(description = "해당 답글 번호")
    private String commentId;

    @Schema(description = "댓글 내용")
    private String comment;

    @Schema(description = "답글 코드블럭")
    private String code;


}
