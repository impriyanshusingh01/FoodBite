# Java 21 base image
FROM eclipse-temurin:21-jdk

# app folder create
WORKDIR /app

# jar copy
COPY target/FoodBite-0.0.1-SNAPSHOT.jar app.jar

# port expose
EXPOSE 8080

# run command
ENTRYPOINT ["java","-jar","/app/app.jar"]