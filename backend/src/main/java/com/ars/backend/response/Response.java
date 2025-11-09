package com.ars.backend.response;


import org.springframework.http.HttpStatus;

public record Response(
        boolean success,
        HttpStatus statusCode,
        Object data)
{}
