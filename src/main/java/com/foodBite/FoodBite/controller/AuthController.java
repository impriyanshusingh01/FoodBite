package com.foodBite.FoodBite.controller;

import com.foodBite.FoodBite.modal.request.AuthLoginRequest;
import com.foodBite.FoodBite.modal.request.AuthSignupRequest;
import com.foodBite.FoodBite.modal.response.AuthLoginTokenResponse;
import com.foodBite.FoodBite.modal.response.AuthSignupResponse;
import com.foodBite.FoodBite.security.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/foodBite/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthSignupResponse> register(@RequestBody AuthSignupRequest authSignupRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.authSignup(authSignupRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthLoginTokenResponse> login(@RequestBody AuthLoginRequest authLoginRequest){
        return ResponseEntity.ok(authService.authLogin(authLoginRequest));
    }
}
