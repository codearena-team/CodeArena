package com.ssafy.codearena.board.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "답글 작성을 위한 DTO")
public class CommentWriteDto {

    @Schema(description = "해당 게시글 번호")
    private String articleNo;

    @Schema(description = "작성자 ID")
    private String userId;

    @Schema(description = "댓글 내용")
    private String comment;

    @Schema(description = "답글 코드블럭")
    private String code;

}
