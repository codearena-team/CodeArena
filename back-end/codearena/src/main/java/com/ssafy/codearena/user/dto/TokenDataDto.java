package com.ssafy.codearena.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class TokenDataDto {
    private String userId;
    private String userEmail;
    private String userNickname;
    private String speedRating;
    private String effiRating;
    private String userPassword;
}
