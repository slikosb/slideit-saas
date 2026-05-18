import type { Discipline } from "./descipline.enum";

export interface User {
  id: number;
  nom: string;
  prenom: string;
  role: string;
  telephone: string;
}

export interface Session {
  id: number;
  discipline: Discipline;
  dateHeureDebut: string;
  dateHeureFin: string;
  statut: string;
  coach: User;
  eleve: User;
}
