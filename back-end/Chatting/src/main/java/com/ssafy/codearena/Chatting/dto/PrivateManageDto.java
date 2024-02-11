package com.ssafy.codearena.Chatting.dto;

import lombok.Data;

@Data
public class PrivateManageDto implements Comparable<PrivateManageDto>{
    private String gameId;
    private int Participants;
    private String player1;
    private String player2;
    private String player3;
    private String player4;
    private String roomType;
    private String gamemode;
    private boolean player1_leave;
    private boolean player2_leave;
    private boolean player3_leave;
    private boolean player4_leave;

    @Override
    public int compareTo(PrivateManageDto privateManageDto) {
        return (privateManageDto.getParticipants() - this.Participants);
    }
}
