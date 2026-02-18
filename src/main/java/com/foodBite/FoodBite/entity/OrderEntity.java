package com.foodBite.FoodBite.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "foodBite-orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderEntity {
    @Id
    private String id;

    private String userId;

    private List<OrderItem> items;

    private double subtotal;
    private double tax;
    private double deliveryCharge;
    private double totalAmount;

    private String orderStatus;
    private String paymentStatus;


    private String fullName;
    private String phoneNumber;
    private String addressLine;
    private String city;
    private String pincode;

    private LocalDateTime createdAt;
}
