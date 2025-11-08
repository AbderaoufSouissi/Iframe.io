package com.ars.backend.controller;

import com.ars.backend.dto.UserDto;
import com.ars.backend.response.Response;
import com.ars.backend.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/webhooks")
@RequiredArgsConstructor
public class ClerkWebhookController {

    @Value("${clerk.webhook.secret}")
    private String webhookSecret;

    private final UserService userService;

    @PostMapping("/clerk")
    public ResponseEntity<?> handleClerkWebhook(@RequestHeader("svix-id") String svixId,
                                                @RequestHeader("svix-timestamp") String svixTimestamp,
                                                @RequestHeader("svix-signature") String svixSignature,
                                                @RequestBody String payload) {
        Response response = null;
        try {
            boolean isValid = verifyWebhookSignature(svixId, svixTimestamp, svixSignature, payload);
            if(!isValid){
                response = new Response(
                        false,
                        HttpStatus.UNAUTHORIZED,
                        "Invalid webhook signature");
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(response);
            }
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(payload);
            String eventType = rootNode.path("type").asText();

            switch (eventType) {
                case "user.created" -> {
                    handleUserCreated(rootNode.path("data").path("object"));
                    break;
                }
                case "user.updated" -> {
                    handleUserUpdated(rootNode.path("data").path("object"));
                    break;
                }
                case "user.deleted" -> {
                    handleUserDeleted(rootNode.path("data").path("object"));
                    break;
                }

            }
            return new ResponseEntity<>(HttpStatus.OK);

        }catch(Exception e) {
            response = new Response(
                    false,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Something went wrong");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(response);
        }
    }



    private void handleUserCreated(JsonNode data) {
        UserDto newUser = new UserDto(
                data.path("id").asText(),
                data.path("email_addresses").path(0).path("email_address").asText(),
                data.path("first_name").asText(),
                data.path("last_name").asText(),
                null
        );
        userService.saveUser(newUser);
    }



    private void handleUserUpdated(JsonNode data) {
        String clerkId = data.path("id").asText();
        UserDto existingUser = userService.getUserByClerkId(clerkId);
        UserDto updatedUser = new UserDto(
                existingUser.clerkId(),
                data.path("email_addresses").path(0).path("email_address").asText(),
                data.path("first_name").asText(),
                data.path("last_name").asText(),
                data.path("image_url").asText()
        );

        userService.saveUser(updatedUser);

    }

    private void handleUserDeleted(JsonNode data) {

        //TODO : ADD DELETE IMPLEMENTATION
    }

    private boolean verifyWebhookSignature(String svixId, String svixTimestamp, String svixSignature, String payload) {
        return true;
    }


}
