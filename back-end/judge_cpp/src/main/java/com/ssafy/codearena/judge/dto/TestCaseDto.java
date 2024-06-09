package com.ssafy.codearena.judge.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class TestCaseDto {
    private String input;
    private String output;
    private String tid;
    private String problemTime;
}
