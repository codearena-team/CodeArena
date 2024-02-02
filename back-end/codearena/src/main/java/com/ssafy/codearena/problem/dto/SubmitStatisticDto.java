package com.ssafy.codearena.problem.dto;


import lombok.Data;

import java.util.List;

@Data
public class SubmitStatisticDto {
    AvgByLangDto avgByLang;
    List<RatioOfAlgoDto> ratioOfAlgo;
}
