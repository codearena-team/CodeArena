package com.ssafy.codearena.problem.dto;

import lombok.Data;

import java.util.List;


@Data
public class TagListDto {
    private Integer problemId;
    private List<TagDto> tagList;
}
