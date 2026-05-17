import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Anchor, CheckCircle, Compass, Map, Sparkles, XCircle } from 'lucide-react';
import { Difficulty, Question, difficultyMeta, questions } from '../../data/questions';
import { shuffleArray } from '../../lib/utils';

interface QuizScreenProps {
  difficulty: Difficulty;
  onComplete: (score: number, total: number) => void;
}

const optionLetters = ['A', 'B', 'C', 'D'];

function QuestionVisual({ question, progress }: { question: Question; progress: number }) {
  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-xl shadow-black/20">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(250,204,21,0.18),transparent_28%),linear-gradient(45deg,transparent_62%,rgba(239,68,68,0.22)),linear-gradient(180deg,rgba(15,23,42,0.2),rgba(15,23,42,0.95))]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative flex min-h-48 flex-col justify-between gap-8 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-yellow-300">
              {difficultyMeta[question.difficulty].label}
            </div>
            <div className="max-w-xl text-2xl font-black leading-tight text-white sm:text-3xl">
              {question.arc}
            </div>
          </div>
          <div className="grid size-16 shrink-0 place-items-center rounded-2xl border border-yellow-300/30 bg-yellow-300/10 text-yellow-300">
            <Anchor className="size-8" />
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-3 text-sm font-semibold text-blue-100/80">
            <Map className="size-5 text-blue-200" />
            <span>{question.hint}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white">
            <Compass className="size-4 text-yellow-300" />
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
}

export function QuizScreen({ difficulty, onComplete }: QuizScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const quizQuestions = useMemo(() => {
    const filteredQuestions = questions.filter((question) => question.difficulty === difficulty);
    const questionCount = difficultyMeta[difficulty].questionCount;

    return shuffleArray(filteredQuestions).slice(0, questionCount);
  }, [difficulty]);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [difficulty]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = quizQuestions.length > 0 ? ((currentQuestionIndex + 1) / quizQuestions.length) * 100 : 0;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback || !currentQuestion) return;

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const nextScore = score + (isCorrect ? 1 : 0);

    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    setScore(nextScore);

    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;

      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        return;
      }

      onComplete(nextScore, quizQuestions.length);
    }, 1800);
  };

  if (!currentQuestion) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center p-6 text-center text-2xl font-bold text-white">
        Nenhuma pergunta encontrada para esta dificuldade.
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-7rem)] w-full flex-col items-center justify-center px-4 py-8 sm:px-6 md:p-10">
      <div className="w-full max-w-5xl">
        <motion.div
          className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="min-w-0">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-blue-200/70">
              Banco local otimizado
            </div>
            <div className="mt-1 text-xl font-black text-blue-50 sm:text-2xl">
              Pergunta {currentQuestionIndex + 1} de {quizQuestions.length}
            </div>
            <div className="mt-1 text-sm text-blue-100/70">{difficultyMeta[difficulty].subtitle}</div>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-sm font-bold text-yellow-300 shadow-lg shadow-black/20 ring-1 ring-yellow-300/10">
            <Sparkles className="size-5" />
            {score} pontos
          </div>
        </motion.div>

        <div className="mb-8 h-3 overflow-hidden rounded-full border border-slate-700 bg-slate-800/60">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-sky-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.section
            key={currentQuestionIndex}
            className="rounded-2xl border border-slate-700/60 bg-slate-900/[0.88] p-4 shadow-2xl shadow-black/25 backdrop-blur-sm sm:p-6 md:p-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionVisual question={currentQuestion} progress={progress} />

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-blue-200/80">
              <span>Tema: {currentQuestion.arc}</span>
              <span>{difficultyMeta[currentQuestion.difficulty].label}</span>
            </div>

            <h2 className="mb-8 max-w-4xl text-balance break-words text-2xl font-black leading-tight text-white sm:text-3xl">
              {currentQuestion.question}
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showCorrect = showFeedback && isCorrect;
                const showIncorrect = showFeedback && isSelected && !isCorrect;

                return (
                  <motion.button
                    type="button"
                    key={option}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`relative min-h-20 rounded-2xl border p-5 text-left transition-all duration-300 ${
                      !showFeedback
                        ? 'cursor-pointer border-slate-600 bg-slate-800/80 text-white hover:border-yellow-300/50 hover:bg-slate-700/90 hover:shadow-xl'
                        : 'cursor-not-allowed border-slate-700 bg-slate-800/70 text-white/80'
                    } ${showCorrect ? 'border-green-300 bg-green-600 text-white shadow-xl shadow-green-950/30' : ''} ${
                      showIncorrect ? 'border-red-300 bg-red-600 text-white shadow-xl shadow-red-950/30' : ''
                    }`}
                    whileHover={!showFeedback ? { y: -2 } : {}}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10 text-sm font-black text-yellow-200">
                        {optionLetters[index]}
                      </span>
                      <span className="min-w-0 flex-1 break-words text-base font-bold leading-snug sm:text-lg">
                        {option}
                      </span>
                      {showCorrect && <CheckCircle className="size-7 shrink-0" />}
                      {showIncorrect && <XCircle className="size-7 shrink-0" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  className="mt-6 rounded-2xl border border-white/10 bg-white/[0.08] p-4 text-sm font-medium leading-relaxed text-blue-50 sm:text-base"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {currentQuestion.explanation}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
}
