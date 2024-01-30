package com.ssafy.codearena.Chatting.service;

import com.ssafy.codearena.Chatting.dto.ChatRoom;
import com.ssafy.codearena.Chatting.mapper.GameMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{

    private Map<String, ChatRoom> chatRoomMap;
    private final GameMapper gameMapper;

    @PostConstruct
    private void init() {
        chatRoomMap = new LinkedHashMap<>();
    }


    /*
     * 모든 방 리스트 찾기
     * */
    @Override
    public List<ChatRoom> findAllRoom() {
        List chatRooms = new ArrayList(chatRoomMap.values());
        Collections.reverse(chatRooms);
        return chatRooms;
    }


    /*
     * 특정 방 찾기
     * */
    @Override
    public ChatRoom findRoomById(String id) {
        return chatRoomMap.get(id);
    }


    @Override
    public void InsertRoom(String roomId, ChatRoom chatRoom) {

        chatRoomMap.put(roomId, chatRoom);
    }

    @Override
    public int findProblemById() {
        return gameMapper.findProblemById();
    }

//    @Override
//    public BoardListDto listArticle(Map<String, String> map) throws Exception {
//        Map<String, Object> param = new HashMap<String, Object>();
//        param.put("word", map.get("word") == null ? "" : map.get("word"));
//        int currentPage = Integer.parseInt(map.get("pgno") == null ? "1" : map.get("pgno"));
//        int sizePerPage = Integer.parseInt(map.get("spp") == null ? "20" : map.get("spp"));
//        System.out.println("??");
//        int boardtype = Integer.parseInt(map.get("boardtype") == null ? "1" : map.get("boardtype"));
//        System.out.println("??");
//        int start = currentPage * sizePerPage - sizePerPage;
//        param.put("start", start);
//        param.put("listsize", sizePerPage);
//        param.put("boardtype", boardtype);
//
//        String key = map.get("key");
//        param.put("key", key == null ? "" : key);
//        if ("user_id".equals(key))
//            param.put("key", key == null ? "" : "b.user_id");
//        List<BoardDto> list = boardMapper.listArticle(param);
//        if ("user_id".equals(key))
//            param.put("key", key == null ? "" : "user_id");
//        int totalArticleCount = boardMapper.getTotalArticleCount(param);
//        int totalPageCount = (totalArticleCount - 1) / sizePerPage + 1;
//
//        BoardListDto boardListDto = new BoardListDto();
//        boardListDto.setArticles(list);
//        boardListDto.setCurrentPage(currentPage);
//        boardListDto.setTotalPageCount(totalPageCount);
//
//        return boardListDto;
//    }

}
