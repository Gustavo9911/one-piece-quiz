import { Anchor, Compass, Home } from 'lucide-react';
import { SenaiLogo } from './SenaiLogo';

interface HeaderProps {
  onHome: () => void;
  onStart: () => void;
}

export function Header({ onHome, onStart }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-slate-950/[0.92] px-3 py-3 backdrop-blur-md sm:px-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <button
          type="button"
          onClick={onHome}
          className="flex min-w-0 items-center gap-4 rounded-full text-left outline-none transition focus-visible:ring-2 focus-visible:ring-yellow-300/70"
          aria-label="Voltar para o início"
        >
          <SenaiLogo />
          <div className="hidden min-w-0 md:block">
            <div className="truncate text-sm font-black uppercase tracking-[0.24em] text-blue-200/90">
              Quiz Temático SENAI
            </div>
            <div className="truncate text-xs font-semibold text-blue-100/70">
              One Piece com perguntas locais revisadas.
            </div>
          </div>
        </button>

        <div className="hidden items-center gap-3 rounded-full bg-slate-900/80 px-4 py-2 text-sm font-semibold text-blue-100 shadow-lg shadow-black/10 ring-1 ring-white/10 lg:flex">
          <Compass className="size-4 text-yellow-300" />
          <span>Sem textos quebrados, sem tema errado</span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onHome}
            className="hidden h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 text-sm font-bold text-blue-100 shadow-lg shadow-black/10 transition hover:border-blue-300/40 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/70 sm:inline-flex"
          >
            <Home className="size-4" />
            Início
          </button>

          <button
            type="button"
            onClick={onStart}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 px-4 text-sm font-black uppercase tracking-[0.12em] text-slate-950 shadow-lg shadow-yellow-900/20 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200/80 sm:px-5"
          >
            <Anchor className="size-4" />
            Entrar
          </button>
        </div>
      </div>
    </header>
  );
}
