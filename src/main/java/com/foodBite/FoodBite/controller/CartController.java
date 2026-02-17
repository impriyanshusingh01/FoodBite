package com.foodBite.FoodBite.controller;

import com.foodBite.FoodBite.modal.request.CartRequest;
import com.foodBite.FoodBite.modal.response.CartListResponse;
import com.foodBite.FoodBite.modal.response.CartResponse;
import com.foodBite.FoodBite.service.Impl.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    @PostMapping("/{foodId}")
    public ResponseEntity<CartResponse> addCart(@RequestBody CartRequest cartRequest, @PathVariable String foodId){

        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.addCart(cartRequest, foodId));
    }

    @GetMapping
    public ResponseEntity<List<CartResponse>> getCartList(){
        return ResponseEntity.ok(cartService.getCartList());
    }

    @PatchMapping("/{cartId}")
    public ResponseEntity<CartListResponse> updateQuantity(@RequestBody CartRequest cartRequest, @PathVariable String cartId){
        cartService.updateQuantity(cartRequest, cartId);
        return ResponseEntity.ok(cartService.getCartWithCalculation());
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<CartListResponse> deleteCart(@PathVariable String cartId){
        cartService.deleteCart(cartId);
        return ResponseEntity.ok(cartService.getCartWithCalculation());
    }

    @GetMapping("/calculate")
    public ResponseEntity<CartListResponse> getCartCalculation(){
        return ResponseEntity.ok(cartService.getCartWithCalculation());
    }

}
