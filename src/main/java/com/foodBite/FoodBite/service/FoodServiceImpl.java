package com.foodBite.FoodBite.service;

import com.foodBite.FoodBite.entity.FoodEntity;
import com.foodBite.FoodBite.modal.request.FoodRequest;
import com.foodBite.FoodBite.modal.response.FoodResponse;
import com.foodBite.FoodBite.repository.FoodRepository;
import com.foodBite.FoodBite.service.Impl.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FoodServiceImpl implements FoodService {

private final FoodRepository foodRepository;

private final S3Client s3Client;

@Value("${aws.s3.bucket}")
private String bucket;

    @Override
    public FoodResponse addFood(FoodRequest foodRequest, MultipartFile file) {
        FoodEntity newFoodEntity = convertToFoodRequest(foodRequest);
        String imageUrl = uploadFile(file);
        newFoodEntity.setImageUrl(imageUrl);
        newFoodEntity = foodRepository.save(newFoodEntity);
        return convertToFoodResponse(newFoodEntity);
    }

    @Override
    public String uploadFile(MultipartFile file) {
       String fileExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1);
       String key = UUID.randomUUID().toString()+"."+fileExtension;

       try{
           PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                   .key(key)
                   .bucket(bucket)
                   .contentType(file.getContentType())
                   .acl("public-read")
                   .build();

           PutObjectResponse response = s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

           if(response.sdkHttpResponse().isSuccessful()){
               return "http://"+bucket+".s3.amazonaws.com/"+key;
           } else {
               throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "File uploading failed");
           }
       } catch (IOException e) {
           throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR , "Error occurred while uploading a file");
       }

    }

    private FoodEntity convertToFoodRequest(FoodRequest foodRequest) {
        return FoodEntity.builder()
                .name(foodRequest.getName())
                .description(foodRequest.getDescription())
                .category(foodRequest.getCategory())
                .price(foodRequest.getPrice())
                .build();
    }

    private FoodResponse convertToFoodResponse(FoodEntity foodEntity) {
        return FoodResponse.builder()
                .id(foodEntity.getId())
                .imageUrl(foodEntity.getImageUrl())
                .name(foodEntity.getName())
                .price(foodEntity.getPrice())
                .description(foodEntity.getDescription())
                .category(foodEntity.getCategory())
                .build();
    }
}
