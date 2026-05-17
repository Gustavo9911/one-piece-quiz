import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { Crown, Flag, RotateCcw, Share2, Ship, Trophy } from 'lucide-react';

interface ResultsScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
}

interface Rank {
  title: string;
  subtitle: string;
  icon: typeof Trophy;
  color: string;
  message: string;
  minScore: number;
}

const ranks: Rank[] = [
  {
    title: 'Novato Pirata',
    subtitle: 'East Blue',
    icon: Ship,
    color: 'from-slate-500 to-slate-700',
    message: 'Você já começou a viagem. Revise os primeiros arcos e tente novamente.',
    minScore: 0,
  },
  {
    title: 'Pirata da Grand Line',
    subtitle: 'Aventureiro corajoso',
    icon: Flag,
    color: 'from-sky-500 to-blue-700',
    message: 'Bom resultado. Você conhece bem a tripulação e os arcos principais.',
    minScore: 50,
  },
  {
    title: 'Supernova',
    subtitle: 'Geração Pior',
    icon: Crown,
    color: 'from-fuchsia-500 to-purple-700',
    message: 'Excelente. Você pegou detalhes que passam batido para muita gente.',
    minScore: 70,
  },
  {
    title: 'Imperador dos Mares',
    subtitle: 'Yonkou',
    icon: Trophy,
    color: 'from-yellow-400 via-red-500 to-orange-600',
    message: 'Perfeito ou quase perfeito. Esse chapéu está em boas mãos.',
    minScore: 90,
  },
];

export function ResultsScreen({ score, total, onRestart }: ResultsScreenProps) {
  const [showContent, setShowContent] = useState(false);
  const [copied, setCopied] = useState(false);
  const percentage = total > 0 ? (score / total) * 100 : 0;
  const currentRank = [...ranks].reverse().find((rank) => percentage >= rank.minScore) || ranks[0];
  const Icon = currentRank.icon;

  useEffect(() => {
    setShowContent(true);

    if (percentage < 70) return;

    const duration = 2200;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        window.clearInterval(interval);
        return;
      }

      const particleCount = 42 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.12, 0.32), y: Math.random() - 0.2 },
        colors: ['#facc15', '#ef4444', '#38bdf8'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.68, 0.88), y: Math.random() - 0.2 },
        colors: ['#facc15', '#ef4444', '#38bdf8'],
      });
    }, 250);

    return () => window.clearInterval(interval);
  }, [percentage]);

  const handleShare = async () => {
    const text = `Consegui ${score} de ${total} pontos no One Piece Quiz SENAI. Rank: ${currentRank.title}.`;

    if (navigator.share) {
      await navigator.share({ title: 'One Piece Quiz SENAI', text }).catch(() => {});
      return;
    }

    await navigator.clipboard?.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-7rem)] w-full flex-col items-center justify-center overflow-x-hidden px-4 py-8 sm:px-6 md:p-10">
      <motion.div
        className="pointer-events-none absolute left-8 top-1/4 opacity-10"
        animate={{ rotate: [0, 360], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <Trophy className="size-36 text-yellow-500" />
      </motion.div>

      <motion.div
        className="relative z-10 w-full max-w-3xl"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.96 }}
        transition={{ duration: 0.45 }}
      >
        <motion.div
          className={`relative mx-auto mb-6 max-w-md overflow-hidden rounded-lg border border-white/20 bg-gradient-to-br ${currentRank.color} p-8 text-center shadow-2xl shadow-black/25`}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.45, type: 'spring' }}
        >
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:34px_34px]" />
          <div className="relative flex flex-col items-center text-white">
            <Icon className="mb-4 size-20 drop-shadow-2xl" strokeWidth={2} />
            <h2 className="mb-2 text-balance text-3xl font-black uppercase tracking-wide drop-shadow-lg sm:text-4xl">
              {currentRank.title}
            </h2>
            <div className="text-lg font-bold text-white/90">{currentRank.subtitle}</div>
          </div>
        </motion.div>

        <motion.div
          className="mb-6 rounded-lg border border-slate-700/60 bg-slate-900/[0.86] p-6 shadow-2xl shadow-black/25 backdrop-blur-sm sm:p-8"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.45 }}
        >
          <div className="mb-6 text-center">
            <div className="mb-2 text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-orange-400 sm:text-7xl">
              {score}/{total}
            </div>
            <div className="text-2xl font-black text-blue-200">{percentage.toFixed(0)}% de acerto</div>
          </div>

          <div className="mb-6 h-4 overflow-hidden rounded-full border border-slate-700 bg-slate-950/70">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 via-red-500 to-sky-400"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: 0.45, duration: 0.8, ease: 'easeOut' }}
            />
          </div>

          <p className="text-center text-base font-medium leading-relaxed text-blue-100 sm:text-lg">
            {currentRank.message}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center gap-4 sm:flex-row"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.45 }}
        >
          <motion.button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-4 text-base font-black uppercase tracking-[0.1em] text-slate-950 shadow-xl transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-200/60"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <RotateCcw className="size-5" />
            Jogar novamente
          </motion.button>

          <motion.button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-3 rounded-full border border-blue-300/30 bg-blue-700 px-8 py-4 text-base font-black uppercase tracking-[0.1em] text-white shadow-xl transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/60"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Share2 className="size-5" />
            {copied ? 'Copiado' : 'Compartilhar'}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
