package com.ssafy.codearena.profile.service;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.codearena.profile.dto.S3ResultDto;
import com.ssafy.codearena.profile.mapper.ProfileMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;


@Slf4j
@Service
@RequiredArgsConstructor
public class S3FileUploadServiceImpl implements S3FileUploadService {

    // 버킷 이름 동적 할당
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    // 버킷 주소 동적 할당
    @Value("${cloud.aws.s3.bucket.url}")
    private String defaultUrl;

    @Value("${defaultImg}")
    private String defaultImg;

    private final AmazonS3 amazonS3Client;
    private final ProfileMapper mapper;


    public S3ResultDto upload(MultipartFile file, String userId){

        S3ResultDto resultDto = new S3ResultDto();
        resultDto.setStatus("200");
        resultDto.setMsg("프로필 사진 저장 완료");
        resultDto.setData(null);

        try {

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            UUID uuid = UUID.randomUUID();

            // 받은 uuid를 넣어준다.
            amazonS3Client.putObject("codearena-bucket", uuid.toString(), file.getInputStream(), metadata);

            String profileUrl = "https://codearena-bucket.s3.ap-northeast-2.amazonaws.com/" + uuid.toString();

            int result = mapper.putProfile(profileUrl, userId);
            
            if (result != 1) {
                log.debug("[profile-upload] : {} , {}", profileUrl, userId);
                resultDto.setStatus("404");
                resultDto.setMsg("해당 사람 없음");
            }

        } catch (Exception e) {
            log.debug("[profile-upload] : ", e);
            resultDto.setStatus("500");
            resultDto.setMsg("서버 에러 발생");
        }

        return resultDto;
    }

    @Override
    public S3ResultDto defaultImg(String userId) {
        S3ResultDto resultDto = new S3ResultDto();
        resultDto.setStatus("200");
        resultDto.setMsg("기본 이미지로 변경하는데 성공했습니다.");

        try {
           mapper.putProfile(defaultImg, userId);
        } catch (Exception e ) {
            resultDto.setStatus("404");
            resultDto.setMsg("해당 사용자가 없습니다.");
        }

        return resultDto;
    }
}