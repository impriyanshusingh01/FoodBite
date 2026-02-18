package com.foodBite.FoodBite.controller;

import com.foodBite.FoodBite.modal.request.OrderRequest;
import com.foodBite.FoodBite.modal.response.OrderResponse;
import com.foodBite.FoodBite.service.Impl.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/my/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> addOrder(@RequestBody OrderRequest orderRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.addOrder(orderRequest));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable String orderId){
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getOrderList(){
        return ResponseEntity.ok(orderService.getOrderList());
    }


    @GetMapping("/admin")
    public ResponseEntity<List<OrderResponse>> adminGetOrderList(){
        return ResponseEntity.ok(orderService.adminGetOrderList());
    }

}
