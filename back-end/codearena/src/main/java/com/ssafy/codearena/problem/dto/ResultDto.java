package com.ssafy.codearena.problem.dto;

import lombok.Data;

@Data
public class ResultDto {
    private String status;
    private String msg;
    private Object data;
}
