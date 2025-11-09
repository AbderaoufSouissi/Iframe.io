package com.ars.backend.service.impl;

import com.ars.backend.client.ClipDropClient;
import com.ars.backend.service.ImageService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {
    @Value("${clipdrop.api-key}")
    private String apiKey;

    private final ClipDropClient clipDropClient;

    @Override
    public byte[] removeBackground(MultipartFile file) {
        return clipDropClient.removeBackground(file, apiKey);
    }
}
