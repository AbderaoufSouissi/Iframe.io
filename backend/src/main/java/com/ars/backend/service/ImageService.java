package com.ars.backend.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    byte[] removeBackground(MultipartFile file);
}
