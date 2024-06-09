package com.ssafy.codearena.board.controller;

import com.ssafy.codearena.board.dto.BoardDetailDto;
import com.ssafy.codearena.board.dto.BoardUpdateDto;
import com.ssafy.codearena.board.dto.BoardWriteDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

import java.util.Map;

@Tag(name = "게시판 API", description = "게시판 관련 API")
public interface BoardControllerDocs {

    @Operation(summary = "게시판 상세조회")
    @Parameter(name = "boardId", description = "상세보기 할 게시글의 번호", required = true)
    @ApiResponse(responseCode = "200", description = "게시글 상세 조회 성공", content = @Content(schema = @Schema(implementation = BoardDetailDto.class)))
    public ResponseEntity<?> boardDetail(String boardId, HttpServletRequest request);


    @Operation(summary = "게시판 글쓰기")
    @Parameter(name = "Object", description = "boardWriteDto", content = @Content(schema = @Schema(implementation = BoardWriteDto.class)))
    @ApiResponse(responseCode = "201", description = "게시글 글쓰기 성공")
    public ResponseEntity<?> boardWrite(BoardWriteDto boardWriteDto);

    @Operation(summary = "게시판 삭제")
    @Parameter(name = "boardId", description = "삭제할 게시글의 번호", required = true)
    @ApiResponse(responseCode = "200", description = "게시글 삭제 성공")
    public ResponseEntity<?> boardDelete(String boardId);

    //제목, 내용, 코드, 스포방지여부
    @Operation(summary = "게시글 수정")
    @Parameter(name = "Object", description = "boardUpdateDto", content = @Content(schema = @Schema(implementation = BoardUpdateDto.class)))
    @ApiResponse(responseCode = "200", description = "게시글 수정 성공")
    public ResponseEntity<?> boardUpdate(BoardUpdateDto boardUpdateDto);

    @Operation(summary = "게시글 리스트")
    @Parameters(value = {
            @Parameter(name = "pano", description = "조회할 페이지 번호"),
            @Parameter(name = "spp", description = "한 페이지 당 게시글 수 지정"),
            @Parameter(name = "boardType", description = "질문 타입", example = "1 : 질문, 2 : 시간복잡도, 3 : 공간복잡도, 4 : 반례 요청, 5 : 반례"),
            @Parameter(name = "sortType", description = "정렬 기준", example = "time : 최신순, hit : 조회수순, default : time"),
            @Parameter(name = "key", description = "검색 조건", example = "board_title : 제목 기준, problem_id : 문제번호 기준 || DB컬럼명과 똑같이 사용"),
            @Parameter(name = "word", description = "검색 조건 기준으로 검색할 내용")
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "게시글 객체", content = @Content(schema = @Schema(implementation = BoardDetailDto.class)))
    })
    public ResponseEntity<?> boardList(Map<String, String> map);

}
