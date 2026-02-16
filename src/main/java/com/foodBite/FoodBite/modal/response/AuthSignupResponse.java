package com.foodBite.FoodBite.modal.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AuthSignupResponse {

    private String id;
    private String name;
    private  String email;
}
