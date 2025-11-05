package com.ars.backend.service.impl;

import com.ars.backend.dto.UserDto;
import com.ars.backend.entity.UserEntity;
import com.ars.backend.repository.UserRepository;
import com.ars.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ServiceImpl implements UserService {
    private final UserRepository userRepository;


    @Override
    public UserDto saveUser(UserDto request) {
        if(userRepository.existsByClerkId(request.clerkId())){
            throw new RuntimeException("User with clerkId " + request.clerkId() + " already exists");
        }
        UserEntity userEntity = mapToEntity(request);
        userRepository.save(userEntity);
        UserDto userDto = mapToDto(userEntity);
        return userDto;



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
