package com.ssafy.match;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/redis")
public class MyController {
    private MyService service;

    @Autowired
    public MyController(MyService service){
        this.service = service;
    }

    @PostMapping
    public String getRedis(@RequestBody RedisDto redisDto){
        return service.getRedis(redisDto);
    }

    @PostMapping("/match")
    public HashMap<String, List<Object>> match(@RequestBody UserDto userDto){
        return service.enqueue(userDto);
    }
}
