package com.slideit.model;

import com.slideit.enums.Discipline;
import com.slideit.enums.SessionStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Discipline discipline;

    @Column(nullable = false)
    private LocalDateTime dateHeureDebut;

    @Column(nullable = false)
    private LocalDateTime dateHeureFin;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SessionStatus statut;

    @ManyToOne
    @JoinColumn(name = "eleve_id", nullable = false)
    private User eleve;

    @ManyToOne
    @JoinColumn(name = "coach_id", nullable = false)
    private User coach;
}
