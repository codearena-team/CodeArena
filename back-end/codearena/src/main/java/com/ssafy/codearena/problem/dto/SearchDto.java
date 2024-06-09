package com.ssafy.codearena.problem.dto;


import lombok.Data;

@Data
public class SearchDto {
    private String cate;
    private String pgno;
    private String spp;
    private String word;
    private String orderBy;
}
