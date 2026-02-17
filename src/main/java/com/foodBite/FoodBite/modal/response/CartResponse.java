package com.foodBite.FoodBite.modal.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {

    private String cartItemId;
    private String foodId;
    private int quantity;
    private String foodName;
    private String imageUrl;
    private double price;
}
