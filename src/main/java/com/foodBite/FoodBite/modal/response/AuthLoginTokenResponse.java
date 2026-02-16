package com.foodBite.FoodBite.modal.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AuthLoginTokenResponse {

    private String email;
    private String token;
}
