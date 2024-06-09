package com.ssafy.codearena.profile.controller;

import com.ssafy.codearena.profile.dto.S3ResultDto;
import com.ssafy.codearena.profile.service.S3FileUploadServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final S3FileUploadServiceImpl s3Servie;

    @GetMapping("/{userId}")
    public ResponseEntity<S3ResultDto> getProfile(@PathVariable String userId) {
        return new ResponseEntity(s3Servie.getProfile(userId), HttpStatus.OK);
    }

    @PutMapping("/upload/{userId}")
    public ResponseEntity<S3ResultDto> upload(HttpServletRequest request, @PathVariable String userId, @RequestBody MultipartFile file) {
        return new ResponseEntity(s3Servie.upload(file, userId), HttpStatus.OK);
    }

    @PutMapping("/upload/{userId}/default")
    public ResponseEntity<S3ResultDto> defaultImg(@PathVariable String userId) {
        return new ResponseEntity(s3Servie.defaultImg(userId), HttpStatus.OK);
    }
}