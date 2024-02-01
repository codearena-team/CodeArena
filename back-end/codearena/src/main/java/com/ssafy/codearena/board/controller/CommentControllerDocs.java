package com.ssafy.codearena.board.controller;

import com.ssafy.codearena.board.dto.CommentListDto;
import com.ssafy.codearena.board.dto.CommentResultDto;
import com.ssafy.codearena.board.dto.CommentUpdateDto;
import com.ssafy.codearena.board.dto.CommentWriteDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = "답글 API", description = "답글 관련 API")
public interface CommentControllerDocs {


    @Operation(summary = "답글 작성")
    @Parameter(description = "답글 작성 시 필요한 파라미터", content = @Content(schema = @Schema(implementation = CommentWriteDto.class)))
    @ApiResponse(responseCode = "201", description = "답글 쓰기 성공")
    public ResponseEntity<?> commentWrite(CommentWriteDto commentWriteDto);

    @Operation(summary = "답글 조회")
    @Parameter(description = "답글 조회 시 필요한 파라미터", content = @Content(schema = @Schema(implementation = CommentListDto.class)))
    @ApiResponse(responseCode = "200", description = "답글 조회 성공", content = @Content(schema = @Schema(implementation = CommentListDto.class)))
    public ResponseEntity<?> commentList(String articleNo);

    @Operation(summary = "답글 삭제")
    @Parameter(description = "답글 삭제 시 필요한 답글 번호")
    @ApiResponse(responseCode = "200", description = "답글 삭제 성공")
    public ResponseEntity<?> commentDelete(String commentId);

    @Operation(summary = "답글 수정")
    @Parameter(description = "답글 수정 시 쓰기와 같이 모든 값이 필수입니다.", content = @Content(schema = @Schema(implementation = CommentWriteDto.class)))
    @ApiResponse(responseCode = "200", description = "답글 삭제 성공")
    public ResponseEntity<?> commentUpdate(CommentUpdateDto commentUpdateDto);

}
