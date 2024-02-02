package com.ssafy.codearena.problem.dto;


import lombok.Data;

import java.util.List;

@Data
public class SubmitListDto {
    private int itemCount;
    private int pageCount;
    private List<SubmitDto> submitList;
}
