package com.foodBite.FoodBite.service.Impl;

import com.foodBite.FoodBite.modal.request.OrderRequest;
import com.foodBite.FoodBite.modal.response.OrderResponse;

import java.util.List;

public interface OrderService {
    OrderResponse addOrder(OrderRequest orderRequest);
    OrderResponse getOrderById(String orderId);
    List<OrderResponse> getOrderList();
    List<OrderResponse> adminGetOrderList();
}
