# Use a Java + Gradle image
FROM gradle:jdk21 AS build

WORKDIR /app

# Copy build files
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle

# Download dependencies
RUN sed -i 's/\r$//' ./gradlew && chmod +x ./gradlew

# Copy source code
COPY src ./src

# Run the Spring Boot app
EXPOSE 8080
CMD ["./gradlew", "bootRun", "--no-daemon"]