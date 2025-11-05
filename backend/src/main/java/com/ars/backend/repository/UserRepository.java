package com.ars.backend.repository;

import com.ars.backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByClerkId(String clerkId);
    Boolean existsByClerkId(String clerkId);
}
