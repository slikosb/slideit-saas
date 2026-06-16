import logoFromAssets from "../assets/Logo.png";

export function Header() {
  return (
    <header className="flex justify-between items-center border-b border-slate-700 pb-6">
      <img src={logoFromAssets} alt="SlideIt Logo" className="h-15 w-auto" />
    </header>
  );
}
