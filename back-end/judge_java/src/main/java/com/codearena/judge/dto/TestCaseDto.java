package com.codearena.judge.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TestCaseDto {
    private String input;
    private String output;
    private String tid;
}
