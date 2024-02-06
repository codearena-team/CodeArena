package com.ssafy.codearena.Chatting.controller;
import com.ssafy.codearena.Chatting.dto.ChatMessage;
import com.ssafy.codearena.Chatting.dto.ChatSubmitMessage;
import com.ssafy.codearena.Chatting.dto.SubmitResultDto;
import com.ssafy.codearena.Chatting.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

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
        //유저 도중 퇴장
        else if(message.getType() == ChatMessage.MessageType.PLAYER_EXIT) {
            //두 명의 유저의 게임진행유무를 판별하고
            //두 사람 모두 나갔다면 TERMINATED
            //한 사람만 나갔다면 경기 속행
            boolean flag = chatService.playerLeaveEvent(message.getGameId(), message.getSender());
            if(flag) {

                SubmitResultDto submitResultDto = new SubmitResultDto();
                submitResultDto.setType(SubmitResultDto.resultType.END);
                submitResultDto.setGameId(message.getGameId());
                submitResultDto.setWinner(message.getSender());
                submitResultDto.setResult("두 유저가 모두 떠났습니다.");
                terminateGame(message.getGameId(), message.getSender());
                messagingTemplate.convertAndSend("/sub/chat/room/" + message.getGameId(), submitResultDto);
            }
        }
        //타임아웃
        else if(message.getType() == ChatMessage.MessageType.TERMINATED) {
            terminateGame(message.getGameId(), message.getSender());
            messagingTemplate.convertAndSend("/sub/chat/room/" + message.getGameId(), message);
        }
    }

    @Operation(summary = "플레이어 제출 결과에 따른 분기")
    @MessageMapping("chat/submit")
    public void submit(ChatSubmitMessage message) {
        String gameId = message.getGameId();


        //스피드전
        if(message.getMode() == ChatSubmitMessage.GameMode.SPEED) {
            //승패 분기
            if(message.getResult().equals("맞았습니다")) {
                SubmitResultDto submitResultDto = new SubmitResultDto();
                submitResultDto.setType(SubmitResultDto.resultType.END);
                submitResultDto.setGameId(message.getGameId());
                submitResultDto.setWinner(message.getSender());
                submitResultDto.setResult(message.getSender() + "님이 승리하였습니다.");
                terminateGame(message.getGameId(), message.getSender());
                messagingTemplate.convertAndSend("/sub/chat/room/" + message.getGameId(), submitResultDto);
            }
            //경기 속행 시 별다른 메시지는 보내지 않음.
            else {

                SubmitResultDto submitResultDto = new SubmitResultDto();
                submitResultDto.setType(SubmitResultDto.resultType.CONTINUE);
                submitResultDto.setGameId(message.getGameId());
                submitResultDto.setWinner(message.getSender());
                submitResultDto.setResult(message.getSender() + "님이 제출하였지만 틀렸습니다.");
                messagingTemplate.convertAndSend("/sub/chat/room/" + message.getGameId(), submitResultDto);
            }
        }

        //효율전
        else {

            if(message.getResult().equals("맞았습니다")) {
                SubmitResultDto submitResultDto = new SubmitResultDto();
                submitResultDto.setType(SubmitResultDto.resultType.END);
                submitResultDto.setGameId(message.getGameId());
                submitResultDto.setWinner(message.getSender());
                submitResultDto.setResult(message.getSender() + "님의 제출 결과 : 맞았습니다.");
                messagingTemplate.convertAndSend("/sub/chat/room/" + message.getGameId(), submitResultDto);
            }
            //경기 속행 시 별다른 메시지는 보내지 않음.
            else {

                SubmitResultDto submitResultDto = new SubmitResultDto();
                submitResultDto.setType(SubmitResultDto.resultType.CONTINUE);
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