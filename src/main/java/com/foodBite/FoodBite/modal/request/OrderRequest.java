package com.foodBite.FoodBite.modal.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    private String fullName;
    private String phoneNumber;
    private String addressLine;
    private String city;
    private String pincode;
}
