package com.foodBite.FoodBite.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {

    private String foodId;
    private String foodName;
    private String imageUrl;
    private double price;
    private int quantity;
}
