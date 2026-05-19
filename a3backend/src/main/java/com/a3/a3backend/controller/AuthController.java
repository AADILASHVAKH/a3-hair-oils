package com.a3.a3backend.controller;

import com.a3.a3backend.model.User;
import com.a3.a3backend.repository.UserRepository;
import com.a3.a3backend.security.JwtUtils;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Value("${google.clientId}")
    private String googleClientId;

    @PostMapping("/google")
    public ResponseEntity<?> authenticateGoogle(@RequestBody Map<String, String> request) {
        String idTokenString = request.get("idToken");
        
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                String email = payload.getEmail();
                String name = (String) payload.get("name");
                String pictureUrl = (String) payload.get("picture");
                String googleId = payload.getSubject();

                Optional<User> userOptional = userRepository.findByEmail(email);
                User user;
                if (userOptional.isPresent()) {
                    user = userOptional.get();
                    user.setName(name);
                    user.setPicture(pictureUrl);
                    user.setGoogleId(googleId);
                } else {
                    user = User.builder()
                            .email(email)
                            .name(name)
                            .picture(pictureUrl)
                            .googleId(googleId)
                            .role("ROLE_USER")
                            .build();
                }
                userRepository.save(user);

                String jwt = jwtUtils.generateToken(email);
                return ResponseEntity.ok(Map.of(
                    "token", jwt,
                    "user", user
                ));
            } else {
                return ResponseEntity.status(401).body("Invalid ID token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error verifying Google token: " + e.getMessage());
        }
    }
}
