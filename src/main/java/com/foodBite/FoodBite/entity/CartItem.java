package com.foodBite.FoodBite.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "cart")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CartItem {

    @Id
    private String id;

    private String userId;
    private String foodId;
    private int quantity;



}
