package com.foodBite.FoodBite.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodBite.FoodBite.modal.request.FoodRequest;
import com.foodBite.FoodBite.modal.response.FoodResponse;
import com.foodBite.FoodBite.service.Impl.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;



import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/foodBite")
@CrossOrigin("*")
public class FoodController {

    private final FoodService foodService;

   @PostMapping
    public ResponseEntity<FoodResponse> addFood(@RequestPart("food") String food, @RequestPart("file") MultipartFile file) throws JsonProcessingException {

        FoodRequest request =
                new ObjectMapper().readValue(food, FoodRequest.class);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(foodService.addFood(request, file));
    }

    @GetMapping
    public ResponseEntity<List<FoodResponse>> getAllFood(){
       return ResponseEntity.ok(foodService.getAllFood());
    }

    @GetMapping("/{foodId}")
    public ResponseEntity<FoodResponse> getFoodById(@PathVariable String foodId){
       return ResponseEntity.ok(foodService.getFoodById(foodId));
    }

    @DeleteMapping("/{foodId}")
    public ResponseEntity<Void> deleteFood(@PathVariable String foodId){
       foodService.deleteFileById(foodId);
       return ResponseEntity.noContent().build();
    }

    @PutMapping("/{foodId}")
    public ResponseEntity<FoodResponse> updateFood(@PathVariable String foodId, @RequestBody FoodRequest foodRequest){
       return ResponseEntity.ok(foodService.updateFoodById(foodId, foodRequest));
    }

}
