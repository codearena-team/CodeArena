package com.ssafy.match;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.netty.handler.codec.compression.Zstd;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.DefaultTypedTuple;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {
    private static final ConcurrentHashMap<String, WebSocketSession> CLIENTS = new ConcurrentHashMap<>();
    private static final HashMap<String, String> userWithSessionId = new HashMap<>();
    private static final HashMap<String, HashMap<String, Boolean>> matchMap = new HashMap<>();
    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println(session.getId());
        CLIENTS.put(session.getId(), session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        CLIENTS.remove(session.getId());
    }
    @Autowired
    public WebSocketHandler(RedisTemplate<String, Object> redisTemplate){
        this.redisTemplate = redisTemplate;
    }
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        MessageDto receive = objectMapper.readValue(message.getPayload(), MessageDto.class);
        log.debug("버그고치기");
        System.out.println(receive);
        if(receive.getType() == MessageDto.MessageType.POP){
            session.close();
            CLIENTS.remove(session.getId());
        }else if(receive.getType() == MessageDto.MessageType.ENQUEUE){
            System.out.println(receive);
            userWithSessionId.put(receive.getUserId(), session.getId());
            UserDto userDto = new UserDto();
            userDto.setUserId(receive.getUserId());
            userDto.setLang(receive.getLang());
            userDto.setGameMode(receive.getGameMode());
            userDto.setRating(receive.getRating());
            String key = makeKey(userDto);
            redisTemplate.opsForZSet().add(key, userDto.getUserId(), System.currentTimeMillis());
            Long size = redisTemplate.opsForZSet().zCard(key);
            if(size >= 2){
               Set<ZSetOperations.TypedTuple<Object>> set = redisTemplate.opsForZSet().popMin(key, 2);
                ArrayList<ZSetOperations.TypedTuple<Object>> list = new ArrayList<>(set);
                ZSetOperations.TypedTuple<Object> player1 = list.get(0);
                ZSetOperations.TypedTuple<Object> player2 = list.get(1);
                String player1SessionId = userWithSessionId.get(player1.getValue());
                String player2SessionId = userWithSessionId.get(player2.getValue());

                if(player1SessionId == null && player2SessionId != null){
                    WebSocketSession p2Session = CLIENTS.get(player2SessionId);
                    if(p2Session != null){
                        redisTemplate.opsForZSet().add(key, player2.getValue(), player2.getScore());
                    }
                }else if(player1SessionId != null && player2SessionId == null){
                    WebSocketSession p1Session = CLIENTS.get(player1SessionId);
                    if(p1Session!=null){
                        redisTemplate.opsForZSet().add(key, player1.getValue(), player1.getScore());
                    }
                }else if(player1SessionId != null && player2SessionId != null){

                    WebSocketSession p2Session = CLIENTS.get(player2SessionId);
                    WebSocketSession p1Session = CLIENTS.get(player1SessionId);
                    if(p2Session == null && p1Session != null){
                        redisTemplate.opsForZSet().add(key, player1.getValue(), player1.getScore());
                    }else if(p2Session != null && p1Session== null){
                        redisTemplate.opsForZSet().add(key, player2.getValue(), player2.getScore());
                    }else if(p2Session != null && p1Session != null){
                        UUID uuid = UUID.randomUUID();
                        HashMap<String, Boolean> match = new HashMap<>();
                        match.put((String)player1.getValue(), null);
                        match.put((String)player2.getValue(), null);
                        matchMap.put(uuid.toString(), match);
                        MessageDto message1 = makeMessage(MessageDto.MessageType.QUERY, null, uuid.toString(), null, null, null, null);
                        MessageDto message2 = makeMessage(MessageDto.MessageType.QUERY, null, uuid.toString(), null, null, null, null);
                        p1Session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message1)));
                        p2Session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message2)));
                    }
                }
            }
        }else if(receive.getType() == MessageDto.MessageType.YES){
            String recMatchId = receive.getMatchId();
            MessageDto msg = null;
            try{
                matchValidation(session, receive);
                matchMap.get(recMatchId).put(receive.getUserId(), true);
                List<Boolean> queries = (List<Boolean>) matchMap.get(recMatchId).values();
                for(Boolean query : queries){
                    if(!query){

                    }
                }
            }catch(MatchNotFoundException e){
                session.sendMessage(e.getTextMessage());
            } catch (MatchPlayerNotFoundException e) {
                session.sendMessage(e.getTextMessage());
            }
        }
    }
    public void matchValidation(WebSocketSession session, MessageDto receive) throws MatchNotFoundException, MatchPlayerNotFoundException {
        String recMatchId = receive.getMatchId();
        if(recMatchId== null || "".equals(recMatchId) || !matchMap.containsKey(recMatchId)){
            throw new MatchNotFoundException();
        }
        if(!matchMap.get(recMatchId).containsKey(receive.getUserId())){
            throw new MatchPlayerNotFoundException();
        }
    }
    public MessageDto makeMessage(MessageDto.MessageType msgType, String mode, String matchId, String userId, String lang, Integer rating, String content){
        MessageDto message = new MessageDto();
        message.setType(msgType);
        message.setGameMode(mode);
        message.setRating(rating);
        message.setLang(lang);
        message.setMatchId(matchId);
        message.setUserId(userId);
        message.setContent(content);
        return message;
    }

    public String makeKey(UserDto userDto){
        StringBuilder sb = new StringBuilder();
        StringBuilder t = sb.append(userDto.getGameMode()).append("-").append(userDto.getLang()).append("-");
        int rating = userDto.getRating();
        String lv = "";
        if(rating < 1200){
            lv = "lv1";
        }else if(rating >= 1200 && rating < 1400){
            lv = "lv2";
        }else if(rating >= 1400 && rating < 1600){
            lv = "lv3";
        }else if(rating >= 1600 && rating < 1800){
            lv = "lv4";
        }else{
            lv = "lv5";
        }
        t.append(lv);
        return t.toString();
    }
}
