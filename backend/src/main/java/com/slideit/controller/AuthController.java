package com.slideit.controller;

import com.slideit.dto.AuthResponseDto;
import com.slideit.dto.LoginRequestDto;
import com.slideit.dto.RegisterRequestDto;
import com.slideit.model.User;
import com.slideit.repository.UserRepository;
import com.slideit.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthService authService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDto request){

        try{
            authService.register(request);
            return ResponseEntity.ok(Map.of("message", "Utilisateur créé avec succès"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Une erreur interne est survenue"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if(userOpt.isEmpty()){
            return ResponseEntity.status(401).body("Erreur : Indentifiants incorrects !");
        }

        User user = userOpt.get();

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            return ResponseEntity.status(401).body("Erreur : Indentifiants incorrects !");
        }

        String fakeJwtToken = "fake-jwt-token-for-" + user.getEmail();

        return ResponseEntity.ok(new AuthResponseDto(
                fakeJwtToken,
                user.getEmail(),
                user.getRole().name()
        ));
    }
}
