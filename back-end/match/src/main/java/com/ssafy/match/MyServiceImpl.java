package com.ssafy.match;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class MyServiceImpl implements MyService{

    private RedisTemplate<String, Object> redisTemplate;

    private Logger logger = LoggerFactory.getLogger(MyServiceImpl.class);

    @Autowired
    public MyServiceImpl(RedisTemplate<String, Object> redisTemplate){
        this.redisTemplate = redisTemplate;
    }

    @Override
    public String getRedis(RedisDto redisDto) {
        ValueOperations<String, Object> operations = redisTemplate.opsForValue();
        String result = (String) operations.get(redisDto.getKey());
        if(!StringUtils.hasText(result)){
            operations.set(redisDto.getKey(), redisDto.getValue(), 10, TimeUnit.MINUTES);
            logger.info("redis save");
            result = redisDto.getValue();
        }
        return result;
    }

    @Override
    public HashMap<String, List<Object>> enqueue(UserDto userDto) {
        logger.info("get Dto : {}", userDto);
        HashMap<String, List<Object>> match = new HashMap<>();
        String key = makeKey(userDto);
        logger.info("key : {}", key);
        redisTemplate.opsForZSet().add(key, userDto.getUserId(), System.currentTimeMillis());
        Set<Object> lv2Set = redisTemplate.opsForZSet().range(key,0,-1);
        List<Object> lv2 = new ArrayList<>(lv2Set);
        return match;
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
