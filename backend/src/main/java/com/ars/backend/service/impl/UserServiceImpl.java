package com.ars.backend.service.impl;

import com.ars.backend.dto.UserDto;
import com.ars.backend.entity.UserEntity;
import com.ars.backend.repository.UserRepository;
import com.ars.backend.service.UserService;
import lombok.RequiredArgsConstructor;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;


    @Override
    public UserDto saveUser(UserDto request, boolean fromWebhook) {
        if (!fromWebhook) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.getName().equals(request.clerkId())) {
                throw new RuntimeException("Unauthorized user");
            }
        }

        UserEntity userEntity = userRepository.findByClerkId(request.clerkId())
                .map(existing -> {
                    existing.setEmail(request.email());
                    existing.setFirstName(request.firstName());
                    existing.setLastName(request.lastName());
                    existing.setPhotoUrl(request.photoUrl());
                    return existing;
                })
                .orElseGet(() -> mapToEntity(request));

        userRepository.save(userEntity);
        return mapToDto(userEntity);
    }

    @Override
    public void deleteUserByClerkId(String id) {
        UserEntity userToDelete = userRepository.findByClerkId(id)
                .orElseThrow(() -> new RuntimeException("User with clerkId " + id + " not found"));
        userRepository.delete(userToDelete);
    }


    @Override
    public UserDto getUserByClerkId(String id) {
        UserEntity userEntity = userRepository.findByClerkId(id)
                .orElseThrow(() -> new RuntimeException("User with clerkId " + id + " not found"));
        return mapToDto(userEntity);
    }

    private UserDto mapToDto(UserEntity userEntity) {
        return new UserDto(
                userEntity.getClerkId(),
                userEntity.getEmail(),
                userEntity.getFirstName(),
                userEntity.getLastName(),
                userEntity.getPhotoUrl()
        );
    }

    private UserEntity mapToEntity(UserDto userDto) {
        return UserEntity.builder()
                .clerkId(userDto.clerkId())
                .email(userDto.email())
                .firstName(userDto.firstName())
                .lastName(userDto.lastName())
                .photoUrl(userDto.photoUrl())
                .build();
    }
}
