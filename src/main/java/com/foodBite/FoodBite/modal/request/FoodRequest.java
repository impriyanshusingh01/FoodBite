package com.foodBite.FoodBite.modal.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodRequest {

    private String name;
    private String description;
    private double price;
    private String category;
}
