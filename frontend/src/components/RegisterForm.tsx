import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService, type RegisterRequest } from "../services/auth.service";

export function RegisterForm() {
  const navigate = useNavigate();

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (password !== confirmPassword) {
      setStatusMessage({
        text: "Les mots de passe ne correspondent pas.",
        isError: true,
      });
      return;
    }

    const payload: RegisterRequest = {
      nom,
      prenom,
      email,
      password,
      telephone: telephone || undefined,
      role: "ELEVE",
    };

    try {
      const response = await AuthService.register(payload);

      setStatusMessage({
        text: response.message || "Compte créé avec succès ! Redirection...",
        isError: false,
      });

      setNom("");
      setPrenom("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTelephone("");

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err: unknown) {
      setStatusMessage({
        text: err instanceof Error ? err.message : "Une erreur est survenue.",
        isError: true,
      });
    }
  };

  return (
    <div className="relative z-10 w-full max-w-[420px] p-8 rounded-tl-[28px] rounded-br-[28px] bg-[#a9c7c7]/35 backdrop-blur-xs border border-white/30 shadow-2xl">
      <h2 className="font-bebas text-5xl text-[#0c2f34] text-center mb-6 tracking-wide uppercase">
        ALOHA.
      </h2>

      {statusMessage && (
        <div
          className={`p-3 rounded-xl text-xs font-semibold text-center mb-4 w-full ${
            statusMessage.isError
              ? "bg-red-200/90 text-red-900"
              : "bg-emerald-200/90 text-emerald-900"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <div className="w-full flex gap-2.5">
          <div className="w-1/2 flex flex-col gap-1">
            <label className="font-inter text-[10px] font-medium text-[#0c2f34] tracking-wider pl-1">
              Prénom
            </label>
            <input
              type="text"
              placeholder="Louise"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b3c43] text-[#B9D8CE] placeholder-[#B9D8CE]/60 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="w-1/2 flex flex-col gap-1">
            <label className="font-inter text-[10px] font-medium text-[#0c2f34] tracking-wider pl-1">
              Nom
            </label>
            <input
              type="text"
              placeholder="Harel"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b3c43] text-[#B9D8CE] placeholder-[#B9D8CE]/60 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-inter text-[10px] font-medium text-[#0c2f34] tracking-wider pl-1">
            Adresse email
          </label>
          <input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b3c43] text-[#B9D8CE] placeholder-[#B9D8CE]/60 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-inter text-[10px] font-medium text-[#0c2f34] tracking-wider pl-1">
            Mot de passe
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b3c43] text-[#B9D8CE] placeholder-[#B9D8CE]/60 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-inter text-[10px] font-medium text-[#0c2f34] tracking-wider pl-1">
            Confirmez le mot de passe
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b3c43] text-[#B9D8CE] placeholder-[#B9D8CE]/60 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-inter text-[10px] font-medium text-[#0c2f34] tracking-wider pl-1">
            Téléphone (Optionnel)
          </label>
          <input
            type="tel"
            placeholder="06 00 00 00 00"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b3c43] text-[#B9D8CE] placeholder-[#B9D8CE]/60 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <button
          type="submit"
          className="font-inter w-full mt-2 py-3 rounded-full bg-[#f3b300] hover:bg-[#e0a400] text-[#0b3c43] font-normal text-xs tracking-wide transition-all shadow-md active:scale-[0.98]"
        >
          Créer mon compte
        </button>
      </form>

      <div className="mt-5 text-[11px] text-[#0c2f34] font-medium text-center">
        Déjà un compte ?{" "}
        <a href="/login" className="font-bold underline hover:opacity-80">
          Se connecter
        </a>
      </div>
    </div>
  );
}
