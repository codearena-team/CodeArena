package com.ssafy.codearena.problem.dto;


import lombok.Data;

@Data

// problem_Id, user_id, problem_title, problem_content, problem_rating, problem_time, problem_mem, problem_ex_input, problem_ex_output, problem_input_desc, problem_output_desc, problem_validation_code, problem_validation_lang, 26permision
public class ProblemWithSearchDto {
    String problemId;
    String userNickname;
    String problemTitle;
    String problemRating;
    String submitCount;
    String acceptCount;
    String percentage;
}
