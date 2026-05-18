package com.slideit.controller;

import com.slideit.enums.Role;
import com.slideit.model.Session;
import com.slideit.model.User;
import com.slideit.repository.SessionRepository;
import com.slideit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "*")
public class SessionController {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    @PostMapping
    public Session createSession(@RequestBody Session session) {

        User coach = userRepository.findById(session.getCoach().getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Coach non trouvé"));
        User eleve = userRepository.findById(session.getEleve().getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Élève non trouvé"));

        if(!"MONITEUR".equals(coach.getRole().toString())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le coach sélectionné doit avoir le rôle MONITEUR");
        }

        if (!"ELEVE".equals(eleve.getRole().toString())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "L'élève sélectionné doit avoir le rôle ELEVE");
        }
        return sessionRepository.save(session);
    }
}
