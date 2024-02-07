package com.ssafy.codearena.Chatting.controller;
import com.ssafy.codearena.Chatting.dto.*;
import com.ssafy.codearena.Chatting.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import java.util.Objects;

@RequiredArgsConstructor
@Controller
public class ChatController {
    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatService chatService;
    @MessageMapping("chat/message")
    public void message(ChatMessage message) {
        String gameId = message.getGameId();
        //관전 채팅방 참여
        if(message.getType() == ChatMessage.MessageType.ENTER) {
            chatService.plusParticipants(gameId);
        }
        //관전 채팅방 대화 Publishing
        else if (message.getType() == ChatMessage.MessageType.TALK) {
            messagingTemplate.convertAndSend("/sub/chat/room/" + message.getGameId(), message);
        }
        //관전 채팅방 퇴장
        else if(message.getType() == ChatMessage.MessageType.EXIT) {
            chatService.minusParticipants(gameId);
        }

    }

    @MessageMapping("chat/leave")
    public void leave(ChatLeaveMessage message) {

        SubmitResultMessage submitResultDto = new SubmitResultMessage();
        submitResultDto.setGameId(message.getGameId());

        //유저 도중 퇴장
        if(message.getType() == ChatLeaveMessage.MessageType.PLAYER_EXIT) {
            //두 명의 유저의 게임진행유무를 판별하고
            //두 사람 모두 나갔다면 TERMINATED
            //한 사람만 나갔다면 경기 속행
            boolean flag = chatService.playerLeaveEvent(message.getGameId(), message.getSender());

            //두 사람 모두 탈주한 경우
            if(flag) {

                //스피드전의 경우 무승부 처리
                if(message.getMode().equals("0")) {

                    submitResultDto.setType(SubmitResultMessage.resultType.END);
                    submitResultDto.setWinner("");
                    submitResultDto.setResult("무승부 처리 되었습니다.");
                    terminateGame(message.getGameId(), "");
                    messagingTemplate.convertAndSend("/sub/chat/room/" + message.getGameId(), submitResultDto);
                }

                //효율전의 경우 승패분기 탐색
                else if(message.getMode().equals("1")) {
                    //winner 탐색
                    WinnerInfoDto winnerInfoDto = chatService.findWinner(message.getGameId());

                    if(Objects.isNull(winnerInfoDto)) {
                        terminateGame(message.getGameId(), "");
                        submitResultDto.setType(SubmitResultMessage.resultType.END);
                        submitResultDto.setWinner(message.getSender());
                        submitResultDto.setResult("무승부 처리 되었습니다.");
                        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getGameId(), submitResultDto);
                    }
                    else {
                        terminateGame(message.getGameId(), winnerInfoDto.getUserId());
                        submitResultDto.setType(SubmitResultMessage.resultType.END);
                        submitResultDto.setWinner(message.getSender());
                        submitResultDto.setResult(winnerInfoDto.getUserNickname() + "님이 승리하였습니다.");
                        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getGameId(), submitResultDto);
                    }
                }
                return;
            }

            //한 사람만 탈주한 경우

            submitResultDto.setType(SubmitResultMessage.resultType.CONTINUE);
            submitResultDto.setWinner("");
            submitResultDto.setResult(message.getSender() + "님이 퇴장하였습니다.");
            messagingTemplate.convertAndSend("/sub/chat/room/" + message.getGameId(), submitResultDto);
        }
        //타임아웃
        else if(message.getType() == ChatLeaveMessage.MessageType.TERMINATED) {

            if(message.getMode().equals("0")) {
                terminateGame(message.getGameId(), "");
                messagingTemplate.convertAndSend("/sub/chat/room/" + message.getGameId(), message);
            }
        }
    }

    @Operation(summary = "플레이어 제출 결과에 따른 분기")
    @MessageMapping("chat/submit")
    public void submit(ChatSubmitMessage message) {
        String gameId = message.getGameId();


        //스피드전
        if(message.getMode() == ChatSubmitMessage.MessageType.SPEED) {
            //승패 분기
            if(message.getResult().equals("맞았습니다")) {
                SubmitResultMessage submitResultDto = new SubmitResultMessage();
                submitResultDto.setType(SubmitResultMessage.resultType.END);
                submitResultDto.setGameId(message.getGameId());
                submitResultDto.setWinner(message.getSender());
                submitResultDto.setResult(message.getSender() + "님이 승리하였습니다.");
                terminateGame(message.getGameId(), message.getSender());
                messagingTemplate.convertAndSend("/sub/chat/room/" + message.getGameId(), submitResultDto);
            }
            //경기 속행 시 별다른 메시지는 보내지 않음.
            else {

                SubmitResultMessage submitResultDto = new SubmitResultMessage();
                submitResultDto.setType(SubmitResultMessage.resultType.CONTINUE);
                submitResultDto.setGameId(message.getGameId());
                submitResultDto.setWinner(message.getSender());
                submitResultDto.setResult(message.getSender() + "님이 제출하였지만 틀렸습니다.");
                messagingTemplate.convertAndSend("/sub/chat/room/" + message.getGameId(), submitResultDto);
            }
        }

        //효율전
        else if(message.getMode() == ChatSubmitMessage.MessageType.EFFI){

            if(message.getResult().equals("맞았습니다")) {
                SubmitResultMessage submitResultDto = new SubmitResultMessage();
                submitResultDto.setType(SubmitResultMessage.resultType.CONTINUE);
                submitResultDto.setGameId(message.getGameId());
                submitResultDto.setWinner(message.getSender());
                submitResultDto.setResult(message.getSender() + "님의 제출 결과 : 맞았습니다.");
                messagingTemplate.convertAndSend("/sub/chat/room/" + message.getGameId(), submitResultDto);
            }
            //경기 속행 시 별다른 메시지는 보내지 않음.
            else {

                SubmitResultMessage submitResultDto = new SubmitResultMessage();
                submitResultDto.setType(SubmitResultMessage.resultType.CONTINUE);
                submitResultDto.setGameId(message.getGameId());
                submitResultDto.setWinner(message.getSender());
                submitResultDto.setResult(message.getSender() + "님의 제출 결과 : 틀렸습니다.");
                messagingTemplate.convertAndSend("/sub/chat/room/" + message.getGameId(), submitResultDto);
            }
        }

    }

    public void terminateGame(String gameId, String winner) {
        //winner는 승자의 닉네임

        chatService.terminateGame(gameId, winner);
    }

}