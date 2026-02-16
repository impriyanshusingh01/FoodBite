package com.foodBite.FoodBite.repository;

import com.foodBite.FoodBite.entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthRepository extends MongoRepository<UserEntity, String> {

    Optional<UserEntity> findByEmail(String email);
}
