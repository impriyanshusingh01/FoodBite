package com.foodBite.FoodBite.modal.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartListResponse {

    private List<CartResponse> items;
    private double subtotal;
    private double tax;
    private double deliveryCharge;
    private double totalAmount;
}
