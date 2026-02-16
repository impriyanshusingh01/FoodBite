package com.foodBite.FoodBite.modal.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AuthSignupRequest {

    private String name;
    private  String email;
    private String password;
}
