package com.ssafy.codearena.problem.dto;


import lombok.Data;

import java.util.List;

@Data
public class SubmitTagListDto {
    private Integer submitNo;
    private List<SubmitTagDto> tagList;
}
