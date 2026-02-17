package com.foodBite.FoodBite.service;

import com.foodBite.FoodBite.entity.CartItem;
import com.foodBite.FoodBite.entity.FoodEntity;
import com.foodBite.FoodBite.entity.UserEntity;
import com.foodBite.FoodBite.modal.request.CartRequest;
import com.foodBite.FoodBite.modal.response.CartListResponse;
import com.foodBite.FoodBite.modal.response.CartResponse;
import com.foodBite.FoodBite.repository.AuthRepository;
import com.foodBite.FoodBite.repository.CartRepository;
import com.foodBite.FoodBite.repository.FoodRepository;
import com.foodBite.FoodBite.service.Impl.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final FoodRepository foodRepository;
    private final AuthRepository authRepository;
    private final CartRepository cartRepository;

    @Override
    public CartResponse addCart(CartRequest cartRequest, String foodId) {

        UserEntity userEntity = getCurrentUser();

        if(cartRequest.getQuantity() <= 0){
            throw new IllegalArgumentException("Invalid Quantity");
        }
        FoodEntity foodEntity = foodRepository.findById(foodId)
                .orElseThrow(() -> new IllegalArgumentException("food  not found: " + foodId));

        CartItem cartEntity;

        var existing = cartRepository.findByUserIdAndFoodId(userEntity.getId(), foodEntity.getId());

       if (existing.isPresent()){
           cartEntity = existing.get();
           cartEntity.setQuantity(cartEntity.getQuantity() + cartRequest.getQuantity());
       }
       else {
            cartEntity = new CartItem();
           cartEntity.setFoodId(foodEntity.getId());
           cartEntity.setQuantity(cartRequest.getQuantity());
           cartEntity.setUserId(userEntity.getId());
       }

        cartEntity = cartRepository.save(cartEntity);

        return new CartResponse(cartEntity.getId(), cartEntity.getFoodId(), cartEntity.getQuantity(), foodEntity.getName(), foodEntity.getImageUrl(), foodEntity.getPrice());

    }

    @Override
    public List<CartResponse> getCartList() {
        UserEntity userEntity = getCurrentUser();
        List<CartItem> cartEntity = cartRepository.findByUserId(userEntity.getId());

        List<CartResponse> responses = new ArrayList<>();
        for(CartItem cart: cartEntity){

            FoodEntity foodEntity = foodRepository.findById(cart.getFoodId()).orElseThrow(() -> new IllegalArgumentException("food not found"));
            responses.add(new CartResponse(cart.getId(), cart.getFoodId(),cart.getQuantity(), foodEntity.getName(), foodEntity.getImageUrl(),foodEntity.getPrice()));
        }
        return  responses;
    }

    @Override
    public void deleteCart(String cartId) {

        UserEntity userEntity = getCurrentUser();

        CartItem cartEntity = cartRepository.findById(cartId).orElseThrow(() -> new IllegalArgumentException("cart not found"));

        if(!userEntity.getId().equals(cartEntity.getUserId())){
            throw new RuntimeException("Unauthorize access");
        }
        cartRepository.delete(cartEntity);
    }

    @Override
    public void updateQuantity(CartRequest cartRequest, String cartId) {
        UserEntity userEntity = getCurrentUser();
        CartItem cartEntity = cartRepository.findById(cartId).orElseThrow(() -> new IllegalArgumentException("cart not found"));
        if(!userEntity.getId().equals(cartEntity.getUserId())){
            throw new RuntimeException("Unauthorized access");
        }

        if(cartRequest.getQuantity() <= 0){
            cartRepository.delete(cartEntity);
            return;
        }

        cartEntity.setQuantity(cartRequest.getQuantity());
        cartRepository.save(cartEntity);
    }

    @Override
    public CartListResponse getCartWithCalculation() {
        String userId = getCurrentUser().getId();
        List<CartItem> cartItems = cartRepository.findByUserId(userId);

        return buildCartResponse(cartItems);
    }

    @Override
    public void clearCart(String userId) {

        cartRepository.deleteByUserId(userId);
    }

    private CartListResponse buildCartResponse(List<CartItem> cartItems) {

        double subtotal = 0;
        double tax;
        double deliveryCharge;
       double totalAmount;

        List<CartResponse> cartResponses = new ArrayList<>();

        for(CartItem cart: cartItems){
            FoodEntity food = foodRepository.findById(cart.getFoodId()).orElseThrow(() -> new IllegalArgumentException("food not present"));
            subtotal += cart.getQuantity() * food.getPrice();
            cartResponses.add(new CartResponse(
                    cart.getId(),
                    cart.getFoodId(),
                    cart.getQuantity(),
                    food.getName(),
                    food.getImageUrl(),
                    food.getPrice()
            ));

        }
        if(subtotal < 500){
            deliveryCharge = 40;
        } else deliveryCharge = 0;

        tax = subtotal * 0.05;
        totalAmount = subtotal + tax + deliveryCharge;
        return new CartListResponse(cartResponses, subtotal, tax, deliveryCharge, totalAmount);
    }


    private UserEntity getCurrentUser() {

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        if(authentication == null || !authentication.isAuthenticated()){
            throw new RuntimeException("User not authenticated");
        }

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        UserEntity userEntity = authRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("user not found"));

        return userEntity;
    }







}
