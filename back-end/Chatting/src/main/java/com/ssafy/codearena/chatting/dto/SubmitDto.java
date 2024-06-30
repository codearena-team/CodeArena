package com.ssafy.codearena.chatting.dto;


import lombok.Data;

@Data
public class SubmitDto {
    // submit_no, user_id, game_id, problem_id, submit_lang, code, submit_status, time_complexity, memory, submit_date
    String submitNo;
    String userId;
    String gameId;
    String problemId;
    String submitLang;
    String code;
    String submitStatus;
    String timeComplexity;
    String memory;
    String submitDate;
    String gameType;
}
