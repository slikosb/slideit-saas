const API_URL = "http://localhost:8080/api/auth";

export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  telephone?: string; // Optionnel avec le "?"
  role: "ELEVE" | "MONITEUR" | "ADMIN";
}

export const AuthService = {
  async register(payload: RegisterRequest): Promise<string> {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return response.text();
  },
};
