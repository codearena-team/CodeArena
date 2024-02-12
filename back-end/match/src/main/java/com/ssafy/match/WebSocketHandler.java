package com.ssafy.match;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
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
    private static final HashMap<String, HashMap<String, MatchDto>> matchMap = new HashMap<>();
    private final RedisTemplate<String, Object> redisTemplate;

    @Value("${gameserver.url}")
    private String gameserverUrl;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.debug("connect : {}", session.getId());
        CLIENTS.put(session.getId(), session);
        log.debug("connect session obj : {}", CLIENTS.get(session.getId()));
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
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            MessageDto receive = objectMapper.readValue(message.getPayload(), MessageDto.class);
            log.debug("받은 데이터 : {}", receive);
            if (receive.getType() == MessageDto.MessageType.POP) {
                CLIENTS.remove(session.getId());
                redisTemplate.opsForZSet().remove(receive.getQueueKey(), receive.getUserId() + " " + receive.getUserNickname());
                session.close();
            } else if (receive.getType() == MessageDto.MessageType.ENQUEUE) {
                userWithSessionId.put(receive.getUserId() + " " + receive.getUserNickname(), session.getId());
                UserDto userDto = new UserDto();
                userDto.setUserId(receive.getUserId());
                userDto.setLang(receive.getLang());
                userDto.setGameMode(receive.getGameMode());
                userDto.setRating(receive.getRating());
                String key = makeKey(userDto);
                redisTemplate.opsForZSet().add(key, userDto.getUserId() + " " + receive.getUserNickname(), System.currentTimeMillis());
                log.debug("매칭큐에 등록되었습니다. key : {}", key);
                MessageDto dto = makeMessage(MessageDto.MessageType.RESPONSE, receive.getGameMode(), receive.getMatchId(), receive.getUserId(), receive.getLang(), null, "매칭큐에 등록되었습니다.", key, receive.getUserNickname(), null, null, null);
                session.sendMessage(new TextMessage(objectMapper.writeValueAsString(dto)));
                Long size = redisTemplate.opsForZSet().zCard(key);
                if (size >= 2) {
                    log.debug(key + "의 큐 사이즈 2개됨");
                    Set<ZSetOperations.TypedTuple<Object>> set = redisTemplate.opsForZSet().popMin(key, 2);
                    ArrayList<ZSetOperations.TypedTuple<Object>> list = new ArrayList<>(set);
                    ZSetOperations.TypedTuple<Object> player1 = list.get(0);
                    ZSetOperations.TypedTuple<Object> player2 = list.get(1);
                    String[] player1Infos = ((String) player1.getValue()).split(" ");
                    String player1userId = player1Infos[0];
                    String player1userNickname = player1Infos[1];
                    String[] player2Infos = ((String) player2.getValue()).split(" ");
                    String player2userId = player2Infos[0];
                    String player2userNickname = player2Infos[1];
                    String player1SessionId = userWithSessionId.get(player1.getValue());
                    String player2SessionId = userWithSessionId.get(player2.getValue());
                    log.debug("player1 : {} sessionId :{}, player2 : {}, sessionId : {}", player1.getValue(), player1SessionId, player2.getValue(), player2SessionId);
                    if (player1SessionId == null && player2SessionId != null) {
                        WebSocketSession p2Session = CLIENTS.get(player2SessionId);
                        if (p2Session != null) {
                            redisTemplate.opsForZSet().add(key, player2.getValue(), player2.getScore());
                        }
                    } else if (player1SessionId != null && player2SessionId == null) {
                        WebSocketSession p1Session = CLIENTS.get(player1SessionId);
                        if (p1Session != null) {
                            redisTemplate.opsForZSet().add(key, player1.getValue(), player1.getScore());
                        }
                    } else if (player1SessionId != null && player2SessionId != null) {

                        WebSocketSession p2Session = CLIENTS.get(player2SessionId);
                        WebSocketSession p1Session = CLIENTS.get(player1SessionId);
                        if (p2Session == null && p1Session != null) {
                            redisTemplate.opsForZSet().add(key, player1.getValue(), player1.getScore());
                        } else if (p2Session != null && p1Session == null) {
                            redisTemplate.opsForZSet().add(key, player2.getValue(), player2.getScore());
                        } else if (p2Session != null && p1Session != null) {
                            UUID uuid = UUID.randomUUID();
                            HashMap<String, MatchDto> match = getMatchDtoHashMap(uuid, player1, player2, key);
                            matchMap.put(uuid.toString(), match);
                            HashMap<String, String> serverMsg = new HashMap<>();
                            serverMsg.put("type", "QUERY");
                            serverMsg.put("gameMode", receive.getGameMode());
                            serverMsg.put("matchId", uuid.toString());
                            serverMsg.put("userId", player1userId);
                            serverMsg.put("userNickname", player1userNickname);
                            serverMsg.put("enemyId", player2userId);
                            serverMsg.put("enemyNickname", player2userNickname);
                            serverMsg.put("queueKey", key);
                            log.debug("server to player send msg : {}", serverMsg);
                            p1Session.sendMessage(new TextMessage(objectMapper.writeValueAsString(serverMsg)));
                            serverMsg.put("userId", player2userId);
                            serverMsg.put("userNickname", player2userNickname);
                            serverMsg.put("enemyId", player1userId);
                            serverMsg.put("enemyNickname", player1userNickname);
                            log.debug("server to player send msg : {}", serverMsg);
                            p2Session.sendMessage(new TextMessage(objectMapper.writeValueAsString(serverMsg)));
//                            MessageDto message1 = makeMessage(MessageDto.MessageType.QUERY, receive.getGameMode(), uuid.toString(), player1userId, receive.getLang(), null, null, key, player1userNickname, null, null, null);
//                            MessageDto message2 = makeMessage(MessageDto.MessageType.QUERY, receive.getGameMode(), uuid.toString(), player2userId, receive.getLang(), null, null, key, player2userNickname, null, null, null);
//                            p1Session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message1)));
//                            p2Session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message2)));
                        }
                    }
                }
            } else if (receive.getType() == MessageDto.MessageType.YES) {
                String recMatchId = receive.getMatchId();
                log.debug("user : {} 가 매칭 {} 을 수락함", receive.getUserId(), receive.getMatchId());
                MessageDto msg = null;
                matchValidation(session, receive);
                matchMap.get(recMatchId).get(receive.getUserId() + " " + receive.getUserNickname()).setIsOk(true);
                Collection<MatchDto> players = (Collection<MatchDto>) matchMap.get(recMatchId).values();
                int OkCount = 0;
                int nullCount = 0;
                MatchDto aliveUser = null;
                for (MatchDto player : players) {
                    if (player.getIsOk() == null) {
                        nullCount++;
                        continue;
                    }
                    if (!player.getIsOk()) {
                        matchMap.remove(recMatchId);

                    } else {
                        OkCount++;
                        aliveUser = player;
                    }
                }
                if (OkCount == 2) {
                    String title = "";
                    boolean isFirst = true;
                    String userRed = "";
                    String userBlue = "";
                    for (MatchDto player : players) {
                        if (isFirst) {
                            title = player.getUserNickname() + " vs ";
                            isFirst = false;
                            userRed = player.getUserId();
                        } else {
                            title += player.getUserNickname();
                            userBlue = player.getUserId();
                        }

                    }
                    WebClient client = getClient(gameserverUrl);
                    HashMap<String, String> params = new HashMap<>();
                    params.put("gameId", recMatchId);
                    params.put("title", title);
                    params.put("userRed", userRed);
                    params.put("userBlue", userBlue);
                    String mode = "0";
                    if (receive.getGameMode().equals("eff")) {
                        mode = "1";
                    }
                    params.put("gameMode", mode);
                    params.put("language", receive.getLang());
                    HashMap<String, HashMap<String, String>> result = client.post().uri("/chat/gameroom").contentType(MediaType.APPLICATION_JSON).bodyValue(params).retrieve().bodyToMono(HashMap.class).block();
                    // 로직 생성
                    log.debug("from gameserver data : {}", result);
                    String gameId = result.get("data").get("gameId");
                    String viduSession = result.get("data").get("viduSession");
                    String problemId = result.get("data").get("problemId");
                    for (Map.Entry<String, String> entrySet : userWithSessionId.entrySet()) {
                        log.debug("key : {}  sessionId : {}", entrySet.getKey(), entrySet.getValue());
                    }
                    for (Map.Entry<String, WebSocketSession> entrySet : CLIENTS.entrySet()) {
                        log.debug("sessionId : {}  sessionObj : {}", entrySet.getKey(), entrySet.getValue());
                    }
                    log.debug("매치속 플레이어 수 : {}", players.size());
                    HashMap<String, String> serverMsg = new HashMap<>();
                    serverMsg.put("type", "INGAME");
                    serverMsg.put("problemId", problemId);
                    serverMsg.put("gameMode", receive.getGameMode());
                    serverMsg.put("lang", receive.getLang());
                    serverMsg.put("gameId", gameId);
                    Iterator<MatchDto> playerIterator = players.iterator();
                    MatchDto player1 = playerIterator.next();
                    MatchDto player2 = playerIterator.next();
                    WebSocketSession player1Session = CLIENTS.get(userWithSessionId.get(player1.getUserId() +" "+player1.getUserNickname()));
                    WebSocketSession player2Session = CLIENTS.get(userWithSessionId.get(player2.getUserId() +" "+player2.getUserNickname()));
                    serverMsg.put("userId", player1.getUserId());
                    serverMsg.put("userNickname", player1.getUserNickname());
                    serverMsg.put("enemyId", player2.getUserId());
                    serverMsg.put("enemyNickname", player2.getUserNickname());
                    log.debug("server to player1 send message : {} ", serverMsg);
                    player1Session.sendMessage(new TextMessage(objectMapper.writeValueAsString(serverMsg)));
                    serverMsg.put("userId", player2.getUserId());
                    serverMsg.put("userNickname", player2.getUserNickname());
                    serverMsg.put("enemyId", player1.getUserId());
                    serverMsg.put("enemyNickname", player1.getUserNickname());
                    log.debug("server to player2 send message : {} ", serverMsg);
                    player2Session.sendMessage(new TextMessage(objectMapper.writeValueAsString(serverMsg)));
//                    for (MatchDto player : players) {
//                        WebSocketSession playerSession = CLIENTS.get(userWithSessionId.get(player.getUserId() + " " + player.getUserNickname()));
//                        MessageDto dto = makeMessage(MessageDto.MessageType.INGAME, receive.getGameMode(), recMatchId, player.getUserId(), receive.getLang(), null, "게임으로 이동됩니다.", player.getQueueKey(), player.getUserNickname(), gameId, viduSession, problemId);
//                        //session.sendMessage(new TextMessage(objectMapper.writeValueAsString(dto)));
//                        playerSession.sendMessage(new TextMessage(objectMapper.writeValueAsString(dto)));
//                    }
                } else if (OkCount == 1 && nullCount != 1) {
                    matchMap.remove(receive.getMatchId());
                    // MessageDto.MessageType msgType, String mode, String matchId, String userId, String lang, Integer rating, String content, String queueKey, String userNickname
                    String[] frags = aliveUser.getQueueKey().split("-");
                    String mode = frags[0];
                    String lang = frags[1];
                    MessageDto send = makeMessage(MessageDto.MessageType.CONTINUE, mode, null, aliveUser.getUserId(), lang, null, aliveUser.getUserNickname() + "은 매칭큐에 지속됩니다.", aliveUser.getQueueKey(), aliveUser.getUserNickname(), null, null, null);
                    session.sendMessage(new TextMessage(objectMapper.writeValueAsString(send)));
                    redisTemplate.opsForZSet().add(aliveUser.getQueueKey(), aliveUser.getUserId() + " " + aliveUser.getUserNickname(), aliveUser.getEnqueueTime());
                }

            } else if (receive.getType() == MessageDto.MessageType.NO) {
                String recMatchId = receive.getMatchId();
                matchMap.get(recMatchId).get(receive.getUserId() + " " + receive.getUserNickname()).setIsOk(false);
                Collection<MatchDto> players = (Collection<MatchDto>) matchMap.get(recMatchId).values();

                int noCount = 0;
                for (MatchDto player : players) {
                    if (player.getIsOk() == null) continue;
                    if (player.getIsOk()) {
                        redisTemplate.opsForZSet().add(player.getQueueKey(), player.getUserId() + " " + player.getUserNickname(), player.getEnqueueTime());
                    } else {
                        noCount++;
                        session.close();
                    }
                }

                if (noCount == 2) {
                    if(recMatchId !=null && matchMap.containsKey(recMatchId)){
                        matchMap.remove(recMatchId);
                    }
                }
            }

        }catch(Exception e) {
            log.debug("exception : {} ", e);
            sendException(session, e);
        }
    }
    private void sendException(WebSocketSession session, Exception exception){
        try{
            if(exception instanceof  MatchNotFoundException){
                session.sendMessage(((MatchNotFoundException) exception).getTextMessage());
            }else if(exception instanceof MatchPlayerNotFoundException){
                session.sendMessage(((MatchPlayerNotFoundException) exception).getTextMessage());
            }else if(exception instanceof NullPointerException){
                session.sendMessage(ExpressionException.TEXT_MESSAGE);
            }else{
                session.sendMessage(new TextMessage("알수없는 오류가 발생했습니다."));
            }
        }catch(IOException e){
            log.debug("exception : {} ", e);
            log.debug("session 혹은 sendMessage 오류가 발생했습니다.");
        }
    }


    private WebClient getClient(String url){
        return WebClient.create(url);
    }
    private static HashMap<String, MatchDto> getMatchDtoHashMap(UUID uuid, ZSetOperations.TypedTuple<Object> player1, ZSetOperations.TypedTuple<Object> player2, String queueKey) {
        HashMap<String, MatchDto> match = new HashMap<>();
        MatchDto player1MatchValue = new MatchDto();
        MatchDto player2MatchValue = new MatchDto();
        String [] player1Infos = ((String)player1.getValue()).split(" ");
        String player1userId = player1Infos[0];
        String player1userNickname = player1Infos[1];
        String [] player2Infos = ((String)player2.getValue()).split(" ");
        String player2userId = player2Infos[0];
        String player2userNickname = player2Infos[1];
        player1MatchValue.setMatchId(uuid.toString());
        player1MatchValue.setUserId(player1userId);
        player1MatchValue.setEnqueueTime(player1.getScore().longValue());
        player1MatchValue.setIsOk(null);
        player1MatchValue.setQueueKey(queueKey);
        player1MatchValue.setUserNickname(player1userNickname);
        player2MatchValue.setMatchId(uuid.toString());
        player2MatchValue.setUserId(player2userId);
        player2MatchValue.setEnqueueTime(player2.getScore().longValue());
        player2MatchValue.setIsOk(null);
        player2MatchValue.setQueueKey(queueKey);
        player2MatchValue.setUserNickname(player2userNickname);
        match.put((String) player1.getValue(), player1MatchValue);
        match.put((String) player2.getValue(), player2MatchValue);
        return match;
    }

    public void matchValidation(WebSocketSession session, MessageDto receive) throws MatchNotFoundException, MatchPlayerNotFoundException {
        String recMatchId = receive.getMatchId();
        if(recMatchId== null || "".equals(recMatchId) || !matchMap.containsKey(recMatchId)){
            throw new MatchNotFoundException();
        }
        if(!matchMap.get(recMatchId).containsKey(receive.getUserId()+" "+receive.getUserNickname())){
            throw new MatchPlayerNotFoundException();
        }
    }
    public MessageDto makeMessage(MessageDto.MessageType msgType, String mode, String matchId, String userId, String lang, Integer rating, String content, String queueKey, String userNickname, String gameId, String viduSession, String problemId){
        MessageDto message = new MessageDto();
        message.setType(msgType);
        message.setGameMode(mode);
        message.setRating(rating);
        message.setLang(lang);
        message.setMatchId(matchId);
        message.setUserId(userId);
        message.setContent(content);
        message.setQueueKey(queueKey);
        message.setUserNickname(userNickname);
        message.setGameId(gameId);
        message.setProblemId(problemId);
        message.setViduSession(viduSession);
        return message;
    }

    public String makeKey(UserDto userDto) throws NullPointerException{
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
