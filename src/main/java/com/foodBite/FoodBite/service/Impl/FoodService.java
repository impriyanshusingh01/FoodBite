package com.foodBite.FoodBite.service.Impl;

import com.foodBite.FoodBite.modal.request.FoodRequest;
import com.foodBite.FoodBite.modal.response.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

public interface FoodService {

    public FoodResponse addFood(FoodRequest foodRequest, MultipartFile file);
    public String uploadFile(MultipartFile file);
}
