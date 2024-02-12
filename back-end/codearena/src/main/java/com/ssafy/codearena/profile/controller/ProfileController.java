package com.ssafy.codearena.profile.controller;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.codearena.profile.dto.S3ResultDto;
import com.ssafy.codearena.profile.service.S3FileUploadService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final S3FileUploadService s3Servie;

    @PostMapping("/upload/{userId}")
    public ResponseEntity<S3ResultDto> upload(HttpServletRequest request, @PathVariable String userId) {
        return new ResponseEntity(s3Servie.upload(request, userId), HttpStatus.OK);
    }
}