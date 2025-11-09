package com.ars.backend.service;

import com.ars.backend.dto.UserDto;


public interface UserService {
    UserDto saveUser(UserDto request, boolean fromWebhook);
    void deleteUserByClerkId(String id);

    UserDto getUserByClerkId(String id);
}
