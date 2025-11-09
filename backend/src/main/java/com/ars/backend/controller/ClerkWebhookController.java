package com.ars.backend.controller;

import com.ars.backend.dto.UserDto;
import com.ars.backend.response.Response;
import com.ars.backend.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/webhooks")
@RequiredArgsConstructor
public class ClerkWebhookController {

    private final UserService userService;

    @Value("${clerk.webhook.secret}")
    private String webhookSecret;

    @PostMapping("/clerk")
    public ResponseEntity<?> handleClerkWebhook(
            @RequestHeader(value = "svix-id", required = false) String svixId,
            @RequestHeader(value = "svix-timestamp", required = false) String svixTimestamp,
            @RequestHeader(value = "svix-signature", required = false) String svixSignature,
            @RequestBody String payload
    ) {
        try {
            // 🔹 Skip real signature validation for now
            boolean isValid = verifyWebhookSignature(svixId, svixTimestamp, svixSignature, payload);
            if (!isValid) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new Response(false, HttpStatus.UNAUTHORIZED, "Invalid webhook signature"));
            }

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(payload);
            String eventType = rootNode.path("type").asText();
            JsonNode data = rootNode.path("data");

            log.info("📩 Clerk webhook received: {}", eventType);

            switch (eventType) {
                case "user.created" -> handleUserCreated(data);
                case "user.updated" -> handleUserUpdated(data);
                case "user.deleted" -> handleUserDeleted(data);
                default -> log.warn("⚠️ Unhandled Clerk event type: {}", eventType);
            }

            return ResponseEntity.ok(new Response(true, HttpStatus.OK, "Webhook processed successfully"));
        } catch (Exception e) {
            log.error("❌ Error processing Clerk webhook: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response(false, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()));
        }
    }

    // --------------------------------------------------------------------
    // ✅ Webhook event handlers
    // --------------------------------------------------------------------
    private void handleUserCreated(JsonNode data) {
        UserDto newUser = extractUserFromClerkData(data);
        userService.saveUser(newUser, true); // fromWebhook = true (bypass auth)
        log.info("✅ User created/updated via webhook: {}", newUser.clerkId());
    }

    private void handleUserUpdated(JsonNode data) {
        UserDto updatedUser = extractUserFromClerkData(data);
        userService.saveUser(updatedUser, true); // bypass auth
        log.info("🔄 User updated via webhook: {}", updatedUser.clerkId());
    }

    private void handleUserDeleted(JsonNode data) {
        String clerkId = data.path("id").asText();
        log.info("🗑️ User deleted via webhook: {}", clerkId);
        // Optional: implement user deletion if needed
    }

    // --------------------------------------------------------------------
    // ✅ Helper methods
    // --------------------------------------------------------------------
    private UserDto extractUserFromClerkData(JsonNode data) {
        String clerkId = data.path("id").asText(null);
        String email = null;

        if (data.has("email_addresses") && data.path("email_addresses").isArray()
                && data.path("email_addresses").size() > 0) {
            email = data.path("email_addresses").get(0).path("email_address").asText(null);
        }

        return new UserDto(
                clerkId,
                email,
                data.path("first_name").asText(null),
                data.path("last_name").asText(null),
                data.path("image_url").asText(null)
        );
    }

    private boolean verifyWebhookSignature(String svixId, String svixTimestamp, String svixSignature, String payload) {
        // 🔒 TODO: Implement real verification with Svix for production
        return true;
    }
}
