import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService, type LoginRequest } from "../services/auth.service";

export function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const payload: LoginRequest = {
      email,
      password,
    };

    try {
      const response = await AuthService.login(payload);

      setStatusMessage({
        text: response.message || "Connecté(e) avec succès ! Redirection...",
        isError: false,
      });

      setEmail("");
      setPassword("");

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

        <button
          type="submit"
          className="font-inter w-full mt-2 py-3 rounded-full bg-[#f3b300] hover:bg-[#e0a400] text-[#0b3c43] font-normal text-xs tracking-wide transition-all shadow-md active:scale-[0.98]"
        >
          Connexion
        </button>
      </form>

      <div className="mt-5 text-[11px] text-[#0c2f34] font-medium text-center">
        Pas encore de compte ?{" "}
        <a href="/register" className="font-bold underline hover:opacity-80">
          S'inscire
        </a>
      </div>
    </div>
  );
}
