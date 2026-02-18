package com.foodBite.FoodBite.service;

import com.foodBite.FoodBite.entity.*;
import com.foodBite.FoodBite.modal.request.OrderRequest;
import com.foodBite.FoodBite.modal.response.CartListResponse;
import com.foodBite.FoodBite.modal.response.CartResponse;
import com.foodBite.FoodBite.modal.response.OrderResponse;
import com.foodBite.FoodBite.repository.AuthRepository;
import com.foodBite.FoodBite.repository.CartRepository;
import com.foodBite.FoodBite.repository.FoodRepository;
import com.foodBite.FoodBite.repository.OrderRepository;
import com.foodBite.FoodBite.service.Impl.CartService;
import com.foodBite.FoodBite.service.Impl.OrderService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private  final AuthRepository authRepository;
    private CartRepository cartRepository;
    private final CartService cartService;
    private  final OrderRepository orderRepository;

    @Override
    public OrderResponse addOrder(OrderRequest orderRequest) {
        UserEntity userEntity = getCurrentUser();

        List<OrderItem> orderItems = new ArrayList<>();

       CartListResponse cartListResponse = cartService.getCartWithCalculation();

        for(CartResponse cartItem: cartListResponse.getItems()){

       orderItems.add(new OrderItem(
              cartItem.getFoodId(),
               cartItem.getFoodName(),
               cartItem.getImageUrl(),
               cartItem.getPrice(),
               cartItem.getQuantity()
       ));
        }

        OrderEntity orderEntity = convertToEntity(orderItems, orderRequest, cartListResponse, userEntity);
        orderEntity = orderRepository.save(orderEntity);

       cartService.clearCart(userEntity.getId());

        return convertToResponse(orderEntity);

    }

    @Override
    public OrderResponse getOrderById(String orderId) {
        UserEntity userEntity = getCurrentUser();

        OrderEntity orderEntity = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("order not found"));
        if(!orderEntity.getUserId().equals(userEntity.getId())){
            throw new RuntimeException("Unauthorized access");
        }

        return convertToResponse(orderEntity);
    }

    @Override
    public List<OrderResponse> getOrderList() {
        UserEntity userEntity = getCurrentUser();

        List<OrderEntity> orders =
                orderRepository.findByUserId(userEntity.getId());

        List<OrderResponse> responses = new ArrayList<>();

        for(OrderEntity order : orders){
            responses.add(convertToResponse(order));
        }

        return responses;
    }

    @Override
    public List<OrderResponse> adminGetOrderList() {
        List<OrderEntity> orders =
                orderRepository.findAll();

        List<OrderResponse> responses = new ArrayList<>();

        for(OrderEntity order : orders){
            responses.add(convertToResponse(order));
        }

        return responses;
    }

    private OrderResponse convertToResponse(OrderEntity orderEntity) {
        return OrderResponse.builder()
                .orderId(orderEntity.getId())
                .createdAt(orderEntity.getCreatedAt())
                .orderStatus(orderEntity.getOrderStatus())
                .items(orderEntity.getItems())
                .tax(orderEntity.getTax())
                .totalAmount(orderEntity.getTotalAmount())
                .deliveryCharge(orderEntity.getDeliveryCharge())
                .paymentStatus(orderEntity.getPaymentStatus())
                .subtotal(orderEntity.getSubtotal())
                .build();
    }

    private OrderEntity convertToEntity(List<OrderItem> orderItems, OrderRequest orderRequest, CartListResponse cartListResponse, UserEntity userEntity) {
       return OrderEntity.builder()
               .city(orderRequest.getCity())
               .items(orderItems)
               .tax(cartListResponse.getTax())
               .addressLine(orderRequest.getAddressLine())
               .deliveryCharge(cartListResponse.getDeliveryCharge())
               .fullName(orderRequest.getFullName())
               .orderStatus("CONFIRMED")
               .paymentStatus("SUCCESS")
               .phoneNumber(orderRequest.getPhoneNumber())
               .pincode(orderRequest.getPincode())
               .subtotal(cartListResponse.getSubtotal())
               .totalAmount(cartListResponse.getTotalAmount())
               .userId(userEntity.getId())
               .createdAt(LocalDateTime.now())
               .build();

    }

    private UserEntity getCurrentUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || !authentication.isAuthenticated()){
            throw new RuntimeException("Unauthorized access");
        }
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        UserEntity entity = authRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("user not found"));
        return entity;
    }
}
