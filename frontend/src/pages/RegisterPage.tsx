import heroSurf from "../assets/hero-surf.jpg";
import logo from "../assets/Logo.png";
import wave from "../assets/wave.png";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#FDFBF7] font-sans overflow-hidden">
      <div
        className="hidden md:flex md:w-1/2 flex-col justify-between p-12 text-white bg-cover bg-center relative rounded-r-3xl z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.45)), url(${heroSurf})`,
          boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div>
          <img
            src={logo}
            alt="SlideIt Logo"
            className="h-16 w-auto object-contain"
          />
        </div>
        <div className="max-w-lg my-auto mx-auto text-center">
          <h1 className="font-bebas text-4xl font-black uppercase leading-tight tracking-wide drop-shadow-sm">
            Une envie d'organiser vos sessions d'une autre manière ?
          </h1>
          <p className="font-bebas mt-4 text-2xl font-regular uppercase tracking-wider text-slate-100">
            Découvrez votre nouveau logiciel 100% gratuit
          </p>
        </div>
        <div className="text-xs text-slate-200/80 font-medium text-center md:text-left">
          © SLIDEIT — Tous droits réservés
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between items-center p-6 md:p-10 relative bg-transparent">
        <img
          src={wave}
          alt="background-wave"
          className="absolute top-1/2 left-0 w-full -translate-y-1/2 object-contain pointer-events-none z-0"
        />
        <div className="w-full"></div>
        <RegisterForm />

        <div className="flex gap-4 text-xs text-slate-500 font-medium mt-4">
          <a href="#" className="hover:underline">
            Mentions légales
          </a>
          <span>•</span>
          <a href="#" className="hover:underline">
            Contact
          </a>
          <span>•</span>
          <a href="#" className="hover:underline">
            Support
          </a>
        </div>
      </div>
    </div>
  );
}
