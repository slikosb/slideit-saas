import { useState } from "react";
import { AuthService, type RegisterRequest } from "../services/auth.service";

export function Register() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("");

    const payload: RegisterRequest = {
      nom,
      prenom: "",
      email,
      password,
      telephone: undefined,
      role: "ELEVE",
    };

    try {
      const response = await AuthService.register(payload);
      setStatusMessage(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatusMessage(`${err.message}`);
      } else {
        setStatusMessage("Une erreur inconnue est survenue.");
      }
    }
  };

  return (
    <div>
      <div>
        <h1>SLIDEIT</h1>
        <p>Une envie d'organiser vos sessions d'une autre manière?</p>
      </div>
      <div>
        <div>
          <h2>Créer un compte</h2>
          {statusMessage && <p>{statusMessage}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <button type="submit">S'inscrire</button>
          </form>
        </div>
      </div>
    </div>
  );
}
