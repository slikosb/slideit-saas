package com.slideit.service;

import com.slideit.dto.AuthResponseDto;
import com.slideit.dto.LoginRequestDto;
import com.slideit.dto.RegisterRequestDto;
import com.slideit.enums.Role;
import com.slideit.model.User;
import com.slideit.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setEmail("test@slideit.com");
        user.setNom("Morin");
        user.setPrenom("Antoine");
        user.setRole(Role.ELEVE);
        user.setPassword("password");
    }

    @Nested
    @DisplayName("Tests pour la méthode register()")
    class registerTests {

        @Test
        @DisplayName("Succès - Inscription d'un nouveau user")
        void registerSuccess() {
            // GIVEN
            RegisterRequestDto request = new RegisterRequestDto();
            request.setEmail("new@slideit.com");
            request.setPassword("password123");
            request.setNom("Morin");
            request.setPrenom("Antoine");

            when(userRepository.existsByEmail("new@slideit.com")).thenReturn(false);
            when(passwordEncoder.encode("password123")).thenReturn("hashedPassword123");

            // WHEN
            authService.register(request);

            // THEN
            verify(userRepository, times(1)).save(any(User.class));
        }

        @Test
        @DisplayName("Echec - Email déjà existant")
        void registerShouldThrowExceptionWithExistingMail() {
            // GIVEN
            RegisterRequestDto request = new RegisterRequestDto();
            request.setEmail("test@slideit.com");

            when(userRepository.existsByEmail("test@slideit.com")).thenReturn(true);

            // WHEN / THEN
            IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> authService.register(request));

            assertThat(exception.getMessage()).isEqualTo("Cet email est déjà utilisé");
            verify(userRepository, never()).save(any(User.class));
        }
    }

    @Nested
    @DisplayName("Tests pour la méthode Login()")
    class LoginTests {
        @Test
        @DisplayName("Succès - Connexion valide")
        void loginSuccess() {
            // GIVEN
            LoginRequestDto request = new LoginRequestDto();
            request.setEmail("test@slideit.com");
            request.setPassword("password");

            when(userRepository.findByEmail("test@slideit.com")).thenReturn(Optional.of(user));
            when(passwordEncoder.matches(eq("password"), anyString())).thenReturn(true);

            // WHEN
            AuthResponseDto response = authService.login(request);

            // THEN
            assertThat(response).isNotNull();
            assertThat(response.getEmail()).isEqualTo("test@slideit.com");
            assertThat(response.getRole()).isEqualTo(Role.ELEVE.toString());
            assertThat(response.getToken()).contains("fake-jwt-token-for-test@slideit.com");
        }

        @Test
        @DisplayName("Echec - Email introuvable")
        void loginShouldThrowExceptionWhenEmailNotFound() {
            // GIVEN
            LoginRequestDto request = new LoginRequestDto();
            request.setEmail("inconnu@slideit.com");
            request.setPassword("password");

            when(userRepository.findByEmail("inconnu@slideit.com")).thenReturn(Optional.empty());

            // WHEN / THEN
            IllegalArgumentException exception = assertThrows(
                    IllegalArgumentException.class,
                    () -> authService.login(request)
            );

            assertThat(exception.getMessage()).isEqualTo("Identifiants incorrects !");
        }

        @Test
        @DisplayName("Echec - Mot de passe incorrect")
        void loginShouldThrowExceptionWhenPasswordIsIncorrect() {
            // GIVEN
            LoginRequestDto request = new LoginRequestDto();
            request.setEmail("test@slideit.com");
            request.setPassword("mauvaismdp");

            when(userRepository.findByEmail("test@slideit.com")).thenReturn(Optional.of(user));
            when(passwordEncoder.matches(eq("mauvaismdp"), anyString())).thenReturn(false);

            // WHEN / THEN
            IllegalArgumentException exception = assertThrows(
                    IllegalArgumentException.class,
                    () -> authService.login(request)
            );

            assertThat(exception.getMessage()).isEqualTo("Identifiants incorrects !");
        }
    }
}