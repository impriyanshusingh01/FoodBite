package com.foodBite.FoodBite.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "foodBite-User")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserEntity {

    @Id
    private String id;
    private String name;
    private  String email;
    private String password;
}
