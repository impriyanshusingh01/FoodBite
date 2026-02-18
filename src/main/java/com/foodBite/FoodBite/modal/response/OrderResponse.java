package com.foodBite.FoodBite.modal.response;

import com.foodBite.FoodBite.entity.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {

    private String orderId;
    private List<OrderItem> items;

    private double subtotal;
    private double tax;
    private double deliveryCharge;
    private double totalAmount;

    private String orderStatus;
    private String paymentStatus;

    private LocalDateTime createdAt;
}
