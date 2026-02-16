package com.foodBite.FoodBite.security;

import com.foodBite.FoodBite.entity.UserEntity;
import com.foodBite.FoodBite.modal.request.AuthLoginRequest;
import com.foodBite.FoodBite.modal.request.AuthSignupRequest;
import com.foodBite.FoodBite.modal.response.AuthLoginTokenResponse;
import com.foodBite.FoodBite.modal.response.AuthSignupResponse;
import com.foodBite.FoodBite.repository.AuthRepository;
import com.foodBite.FoodBite.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthSignupResponse authSignup(AuthSignupRequest authSignupRequest) {
        if(authRepository.findByEmail(authSignupRequest.getEmail()).isPresent()){
            throw new RuntimeException("email already exist");
        }
       UserEntity userEntity = convertToEntity(authSignupRequest);
        userEntity = authRepository.save(userEntity);
        return convertToResponse(userEntity);
    }

    public AuthLoginTokenResponse authLogin(AuthLoginRequest authLoginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authLoginRequest.getEmail(), authLoginRequest.getPassword())
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        UserEntity entity = authRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(entity, userDetails);
        return new AuthLoginTokenResponse(userDetails.getUsername(), token);

    }


    private UserEntity convertToEntity(AuthSignupRequest authSignupRequest) {
        return UserEntity.builder()
                .name(authSignupRequest.getName())
                .email(authSignupRequest.getEmail())
                .password(passwordEncoder.encode(authSignupRequest.getPassword()))
                .build();
    }

    private AuthSignupResponse convertToResponse(UserEntity entity) {
        return AuthSignupResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .email(entity.getEmail())
                .build();
    }
}
