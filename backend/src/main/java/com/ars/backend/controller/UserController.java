package com.ars.backend.controller;

import com.ars.backend.dto.UserDto;
import com.ars.backend.response.Response;
import com.ars.backend.response.ResponseDto;
import com.ars.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;



    @PostMapping
    public ResponseEntity<Response> addUser(@RequestBody UserDto userDto){
        return ResponseEntity.ok(
                new Response(
                        true,
                        CREATED,
                        userService.saveUser(userDto)
                )
        );
    }
}
