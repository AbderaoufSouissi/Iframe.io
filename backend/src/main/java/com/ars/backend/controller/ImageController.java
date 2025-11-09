package com.ars.backend.controller;

import com.ars.backend.dto.UserDto;
import com.ars.backend.response.Response;
import com.ars.backend.service.ImageService;
import com.ars.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {
    private final UserService userService;
    private final ImageService imageService;



    @PostMapping("/remove-background")
    public ResponseEntity<?> removeBackground(@RequestParam("file") MultipartFile file, Authentication authentication) {
        Response response = null;
        Map<String, Object> responseMap = new HashMap<>();
        try {
            if(authentication.getName().isEmpty() || authentication.getName() == null) {
                response = new Response(false, HttpStatus.FORBIDDEN,"User does not have permission/access to this resource");

                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            UserDto userDto = userService.getUserByClerkId(authentication.getName());
            byte[] imageBytes = imageService.removeBackground(file);
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);

            return ResponseEntity.ok()
                    .contentType(MediaType.TEXT_PLAIN)
                    .body(base64Image);
        }catch (Exception e) {
            response = new Response(
                    false,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "An error occurred while processing the image: " + e.getMessage()
            );

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

        }


    }
}
