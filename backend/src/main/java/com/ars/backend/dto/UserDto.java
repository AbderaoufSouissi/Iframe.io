package com.ars.backend.dto;


public record UserDto(
        String clerkId,
        String email,
        String firstName,
        String lastName,
        String photoUrl
)
{}
