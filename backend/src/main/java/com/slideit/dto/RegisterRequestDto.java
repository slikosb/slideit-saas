package com.slideit.dto;

import com.slideit.enums.Role;
import lombok.Data;

@Data
public class RegisterRequestDto {
    private String nom;
    private String prenom;
    private String email;
    private String password;
    private String telephone;
    private Role role;

}
