package com.foodBite.FoodBite.service.Impl;

import com.foodBite.FoodBite.modal.request.FoodRequest;
import com.foodBite.FoodBite.modal.response.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FoodService {

     FoodResponse addFood(FoodRequest foodRequest, MultipartFile file);
    String uploadFile(MultipartFile file);
    List<FoodResponse> getAllFood();
    FoodResponse getFoodById(String foodId);
    boolean deleteFile(String filename);
    void deleteFileById(String foodId);
    FoodResponse updateFoodById(String foodId, FoodRequest foodRequest);

}
