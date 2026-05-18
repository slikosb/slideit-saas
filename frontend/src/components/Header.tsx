import React from "react";

export function Header() {
  return (
    <header className="flex justify-between items-center border-b border-slate-700 pb-6">
      <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
        🏄‍♂️ SlideIt — École de Glisse 🛹
      </h1>
      <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/20">
        connecté
      </span>
    </header>
  );
}
