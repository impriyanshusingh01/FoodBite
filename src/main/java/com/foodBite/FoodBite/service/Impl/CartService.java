package com.foodBite.FoodBite.service.Impl;

import com.foodBite.FoodBite.modal.request.CartRequest;
import com.foodBite.FoodBite.modal.response.CartListResponse;
import com.foodBite.FoodBite.modal.response.CartResponse;

import java.util.List;

public interface CartService {

    CartResponse addCart(CartRequest cartRequest, String foodId);
    List<CartResponse> getCartList();
    void deleteCart(String cartId);
    void updateQuantity(CartRequest cartRequest, String cartId);
    CartListResponse getCartWithCalculation();
    void clearCart(String userId);
}
