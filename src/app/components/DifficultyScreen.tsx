import { motion } from 'motion/react';
import { Crown, Ship, Skull } from 'lucide-react';
import { Difficulty, difficultyMeta } from '../../data/questions';

interface DifficultyScreenProps {
  onSelect: (difficulty: Difficulty) => void;
}

const difficulties = [
  {
    id: 'easy' as const,
    title: 'EAST BLUE',
    subtitle: 'Para começar',
    description: 'Perguntas diretas sobre tripulação, sonhos e primeiros arcos.',
    icon: Ship,
    color: 'from-sky-500 to-blue-700',
  },
  {
    id: 'medium' as const,
    title: 'GRAND LINE',
    subtitle: 'Desafio equilibrado',
    description: 'Personagens, arcos importantes, técnicas e acontecimentos marcantes.',
    icon: Skull,
    color: 'from-red-500 to-rose-700',
  },
  {
    id: 'hard' as const,
    title: 'NEW WORLD',
    subtitle: 'Para fã atento',
    description: 'Mistérios, detalhes de saga e perguntas mais específicas.',
    icon: Crown,
    color: 'from-yellow-400 to-orange-600',
  },
];

export function DifficultyScreen({ onSelect }: DifficultyScreenProps) {
  return (
    <div className="flex min-h-[calc(100vh-7rem)] w-full flex-col items-center justify-center px-4 py-8 sm:px-6 md:p-10">
      <motion.div
        className="mb-10 max-w-3xl text-center"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto mb-4 inline-flex items-center rounded-full border border-blue-400/30 bg-blue-900/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-blue-100 shadow-lg shadow-black/20">
          Quiz 100% local
        </div>
        <h1 className="mb-4 text-balance text-4xl font-black leading-tight text-yellow-400 drop-shadow-lg sm:text-5xl md:text-6xl">
          Escolha seu destino
        </h1>
        <p className="text-base leading-relaxed text-blue-100 sm:text-lg">
          Todas as perguntas foram revisadas para One Piece, sem API externa quebrando texto ou trazendo tema errado.
        </p>
      </motion.div>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
        {difficulties.map((difficulty, index) => {
          const Icon = difficulty.icon;
          const meta = difficultyMeta[difficulty.id];

          return (
            <motion.button
              type="button"
              key={difficulty.id}
              onClick={() => onSelect(difficulty.id)}
              className="group relative min-h-72 overflow-hidden rounded-lg border border-white/15 bg-slate-900/70 p-6 text-left shadow-2xl shadow-black/20 outline-none transition focus-visible:ring-4 focus-visible:ring-yellow-300/60"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${difficulty.color}`} />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:linear-gradient(135deg,rgba(255,255,255,0.10),transparent_42%)]" />

              <div className="relative flex h-full flex-col">
                <div className={`mb-6 grid size-16 place-items-center rounded-lg bg-gradient-to-br ${difficulty.color} text-white shadow-lg`}>
                  <Icon className="size-9" strokeWidth={2.4} />
                </div>

                <div className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-blue-200/70">
                  {difficulty.subtitle}
                </div>
                <h2 className="mb-3 text-3xl font-black tracking-wide text-white">{difficulty.title}</h2>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-blue-100/80">{difficulty.description}</p>

                <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                  <span className="text-sm font-bold text-yellow-300">{meta.questionCount} perguntas</span>
                  <span className="text-sm font-semibold text-blue-100/70">{meta.label}</span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
