package com.slideit.service;

import com.slideit.dto.AuthResponseDto;
import com.slideit.dto.LoginRequestDto;
import com.slideit.dto.RegisterRequestDto;
import com.slideit.enums.Role;
import com.slideit.model.User;
import com.slideit.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void register(RegisterRequestDto request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Cet email est déjà utilisé");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setNom(request.getNom());
        user.setPrenom(request.getPrenom());
        user.setTelephone(request.getTelephone());

        user.setRole(request.getRole() != null ? request.getRole() : Role.ELEVE);

        String hashedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(hashedPassword);

        userRepository.save(user);
    }

    public AuthResponseDto login(LoginRequestDto request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Identifiants incorrects !"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Identifiants incorrects !");
        }

        String fakeJwtToken = "fake-jwt-token-for-" + user.getEmail();

        return new AuthResponseDto(
                fakeJwtToken,
                user.getEmail(),
                user.getRole().name()
        );
    }
}
