package com.example.TransManage.Controller;

import com.example.TransManage.Model.User;
import com.example.TransManage.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/auth")

public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
            
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", true);
                    response.put("message", "Login successful");
                    response.put("user", Map.of(
                        "id", user.getId(),
                        "username", user.getUsername(),
                        "email", user.getEmail(),
                        "role", user.getRole(),
                        "firstName", user.getFirstName(),
                        "lastName", user.getLastName()
                    ));
                    return ResponseEntity.ok(response);
                }
            }
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Invalid username or password");
            return ResponseEntity.badRequest().body(errorResponse);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Login failed: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            // Check if username or email already exists
            if (userRepository.existsByUsername(registerRequest.getUsername())) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Username already exists");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            if (userRepository.existsByEmail(registerRequest.getEmail())) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Email already exists");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());

            // Create new user
            User newUser = new User(
                registerRequest.getUsername(),
                registerRequest.getEmail(),
                encodedPassword,
                registerRequest.getFirstName(),
                registerRequest.getLastName(),
                User.UserRole.USER
            );

            User savedUser = userRepository.save(newUser);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("user", Map.of(
                "id", savedUser.getId(),
                "username", savedUser.getUsername(),
                "email", savedUser.getEmail(),
                "role", savedUser.getRole()
            ));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Registration failed: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    // Inner classes for request bodies
    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { 
            return email; 
        }
        public void setEmail(String email) { 
            this.email = email; 
        }
        public String getPassword() { 
            return password; 
        }
        public void setPassword(String password) { 
            this.password = password; 
        }
    }

    public static class RegisterRequest {
        private String username;
        private String email;
        private String password;
        private String firstName;
        private String lastName;

        public String getUsername() { 
            return username; 
        }
        public void setUsername(String username) { 
            this.username = username; 
        }
        public String getEmail() { 
            return email; 
        }
        public void setEmail(String email) { 
            this.email = email; 
        }
        public String getPassword() { 
            return password; 
        }
        public void setPassword(String password) { 
            this.password = password; 
        }
        public String getFirstName() { 
            return firstName; 
        }
        public void setFirstName(String firstName) { 
            this.firstName = firstName; 
        }
        public String getLastName() { 
            return lastName; 
        }
        public void setLastName(String lastName) { 
            this.lastName = lastName; 
        }
    }
}