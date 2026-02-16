package com.foodBite.FoodBite.security;

import com.foodBite.FoodBite.entity.UserEntity;
import com.foodBite.FoodBite.repository.AuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthDetailService implements UserDetailsService {

    private final AuthRepository authRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity userEntity = authRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("email not found:"));
        return new User(userEntity.getEmail(), userEntity.getPassword(), Collections.emptyList());
    }
}
