# Use a Java + Gradle image
FROM gradle:8.3-jdk17 AS build

WORKDIR /app

# Copy build files
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle

# Download dependencies
RUN ./gradlew build -x test --no-daemon || true

# Copy source code
COPY src ./src

# Run the Spring Boot app
EXPOSE 8080
CMD ["./gradlew", "bootRun", "--no-daemon"]