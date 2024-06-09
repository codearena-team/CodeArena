package com.ssafy.codearena.profile.service;

import com.ssafy.codearena.profile.dto.S3ResultDto;
import org.springframework.web.multipart.MultipartFile;

public interface S3FileUploadService {
    S3ResultDto upload(MultipartFile file, String userId);
    S3ResultDto defaultImg(String userId);
    S3ResultDto getProfile(String userId);
}
