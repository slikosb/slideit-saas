const API_URL = "http://localhost:8080/api/auth";

export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  telephone?: string;
  role?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const AuthService = {
  async register(data: RegisterRequest) {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erreur lors de l'inscription");
    }

    return result;
  },

  async login(data: LoginRequest) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.text();

    if (!response.ok) {
      throw new Error(result || "Erreur lors de la connexion");
    }

    return JSON.parse(result);
  },
};
