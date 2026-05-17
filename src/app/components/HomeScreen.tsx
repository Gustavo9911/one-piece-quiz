import { motion } from 'motion/react';
import { Anchor, Compass, Map, Sailboat } from 'lucide-react';

interface HomeScreenProps {
  onStart: () => void;
}

export function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="relative flex min-h-[calc(100vh-7rem)] w-full flex-col items-center overflow-x-hidden px-4 py-8 sm:px-6 md:py-12">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
      <motion.div
        className="pointer-events-none absolute left-8 top-16 hidden opacity-10 md:block"
        animate={{ rotate: [0, 8, 0], y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Anchor className="size-28 text-yellow-500" />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1fr_0.9fr]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <section className="text-center lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-900/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-blue-100 shadow-lg shadow-black/20">
            <span className="size-2 rounded-full bg-yellow-400" />
            SENAI Edition
          </div>

          <h1 className="mb-3 text-balance text-5xl font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-orange-400 drop-shadow-2xl sm:text-6xl md:text-7xl">
            One Piece
          </h1>
          <h2 className="mb-7 text-2xl font-black uppercase tracking-[0.12em] text-yellow-300 drop-shadow-lg sm:text-3xl">
            Quiz Adventure
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg lg:mx-0">
            Teste seus conhecimentos com perguntas revisadas, dificuldade progressiva e conteúdo local estável.
          </p>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <motion.button
              type="button"
              onClick={onStart}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 px-8 py-4 text-base font-black uppercase tracking-[0.14em] text-slate-950 shadow-2xl shadow-yellow-950/20 outline-none transition hover:brightness-110 focus-visible:ring-4 focus-visible:ring-yellow-200/60"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Anchor className="size-5" />
              Entrar no quiz
            </motion.button>

            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-5 py-4 text-sm font-bold text-blue-100">
              <Compass className="size-5 text-yellow-300" />
              30+ perguntas locais
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-left">
            {[
              ['3', 'dificuldades'],
              ['0', 'APIs quebradas'],
              ['100%', 'One Piece'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.07] p-4">
                <div className="text-2xl font-black text-yellow-300">{value}</div>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100/70">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <motion.section
          className="relative overflow-hidden rounded-lg border border-white/10 bg-slate-950/[0.78] p-6 shadow-2xl shadow-black/25"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(250,204,21,0.16),transparent_32%),linear-gradient(45deg,transparent_60%,rgba(14,165,233,0.16))]" />
          <div className="relative">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.28em] text-blue-200/70">Mapa do desafio</div>
                <div className="mt-1 text-2xl font-black text-white">O mar espera sua resposta</div>
              </div>
              <div className="grid size-14 shrink-0 place-items-center rounded-lg bg-yellow-300 text-slate-950">
                <Map className="size-7" />
              </div>
            </div>

            <div className="grid gap-3">
              {['East Blue', 'Grand Line', 'New World'].map((label, index) => (
                <div key={label} className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.07] p-4">
                  <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-slate-900 text-yellow-300">
                    <Sailboat className="size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-black text-white">{label}</div>
                    <div className="text-sm text-blue-100/70">Etapa {index + 1} desbloqueada</div>
                  </div>
                  <div className="h-2 w-16 rounded-full bg-gradient-to-r from-yellow-300 to-red-500" />
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
