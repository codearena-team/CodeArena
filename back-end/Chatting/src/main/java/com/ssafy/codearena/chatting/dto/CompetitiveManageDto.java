package com.ssafy.codearena.chatting.dto;

import lombok.Data;

@Data
public class CompetitiveManageDto implements Comparable<CompetitiveManageDto>{
    private String gameId;
    private int Participants;
    private String player1;
    private String player2;
    private String roomType;
    private String gamemode;
    private boolean player1_leave;
    private boolean player2_leave;

    @Override
    public int compareTo(CompetitiveManageDto competitiveManageDto) {
        return (competitiveManageDto.getParticipants() - this.Participants);
    }
}
