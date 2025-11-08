package com.ars.backend.service;

import com.ars.backend.dto.UserDto;


public interface UserService {
    UserDto saveUser(UserDto userDto);

    UserDto getUserByClerkId(String id);
}
