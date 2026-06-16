package com.slideit.controller;

import com.slideit.dto.AuthResponseDto;
import com.slideit.dto.LoginRequestDto;
import com.slideit.dto.RegisterRequestDto;
import com.slideit.model.User;
import com.slideit.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDto request){

        if(userRepository.existsByEmail(request.getEmail())){
            return ResponseEntity.badRequest().body("Erreur : Cet email est déjà utilisé");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setNom(request.getNom());
        user.setPrenom(request.getPrenom());
        user.setRole(request.getRole());
        user.setTelephone(request.getTelephone());

        String hashedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(hashedPassword);

        userRepository.save(user);

        return ResponseEntity.ok("Utilisateur créé avec succès !");
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
