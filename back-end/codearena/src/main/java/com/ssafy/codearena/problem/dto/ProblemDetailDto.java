package com.ssafy.codearena.problem.dto;


import lombok.Data;

import java.util.List;

@Data
public class ProblemDetailDto {
    private String problemTitle;
    private String problemContent;
    private String problemId;
    private String submitCount;
    private String acceptCount;
    private String percentage;
    private String userId;
    private String userNickname;
    private String problemInputDesc;
    private String problemOutputDesc;
    private String problemTime;
    private String problemMem;
    private String problemExInput;
    private String problemExOutput;
    private String problemVisibility;
    private List<TagDto> tagList;
    private Boolean isSolve;
}
