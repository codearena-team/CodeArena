package com.ssafy.match;

import java.util.HashMap;
import java.util.List;

public interface MyService {
    String getRedis(RedisDto redisDto);
    HashMap<String, List<Object>> enqueue(UserDto userDto);
}
