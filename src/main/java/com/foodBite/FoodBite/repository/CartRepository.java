package com.foodBite.FoodBite.repository;

import com.foodBite.FoodBite.entity.CartItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CartRepository extends MongoRepository<CartItem, String> {
    Optional<CartItem> findByUserIdAndFoodId(String userId, String foodId);
    List<CartItem> findByUserId(String userId);
    void deleteByUserId(String userId);

}


