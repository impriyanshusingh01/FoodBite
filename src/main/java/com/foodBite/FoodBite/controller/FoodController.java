package com.foodBite.FoodBite.controller;

import com.foodBite.FoodBite.modal.request.FoodRequest;
import com.foodBite.FoodBite.modal.response.FoodResponse;
import com.foodBite.FoodBite.service.Impl.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.thirdparty.jackson.core.JsonProcessingException;
import tools.jackson.databind.ObjectMapper;

@RestController
@RequiredArgsConstructor
@RequestMapping("/foodBite")
public class FoodController {

    private final FoodService foodService;

   @PostMapping
    public ResponseEntity<FoodResponse> addFood(@RequestPart("food") String food, @RequestPart("file") MultipartFile file) {

        FoodRequest request =
                new ObjectMapper().readValue(food, FoodRequest.class);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(foodService.addFood(request, file));
    }

}
