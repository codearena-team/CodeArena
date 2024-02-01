package com.ssafy.codearena.board.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "API 응답 형식")
public class BoardResultDto {

    @Schema(description = "상태 코드")
    private String status;

    @Schema(description = "응답 메시지")
    private String msg;

    @Schema(description = "응답 객체")
    private Object data;
}
