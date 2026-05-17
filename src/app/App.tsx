import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { DifficultyScreen } from './components/DifficultyScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';

type Screen = 'home' | 'difficulty' | 'quiz' | 'results';
type Difficulty = 'easy' | 'medium' | 'hard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const handleStartQuiz = () => {
    setScore(0);
    setTotalQuestions(0);
    setCurrentScreen('difficulty');
  };

  const handleGoHome = () => {
    setScore(0);
    setTotalQuestions(0);
    setCurrentScreen('home');
  };

  const handleSelectDifficulty = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setScore(0);
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (finalScore: number, total: number) => {
    setScore(finalScore);
    setTotalQuestions(total);
    setCurrentScreen('results');
  };

  const handleRestart = () => {
    setScore(0);
    setTotalQuestions(0);
    setCurrentScreen('home');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900">
      <Header onHome={handleGoHome} onStart={handleStartQuiz} />
      <main className="min-h-[calc(100vh-7rem)] pt-28 pb-16">
        {currentScreen === 'home' && <HomeScreen onStart={handleStartQuiz} />}
        {currentScreen === 'difficulty' && <DifficultyScreen onSelect={handleSelectDifficulty} />}
        {currentScreen === 'quiz' && <QuizScreen difficulty={difficulty} onComplete={handleQuizComplete} />}
        {currentScreen === 'results' && <ResultsScreen score={score} total={totalQuestions} onRestart={handleRestart} />}
      </main>
    </div>
  );
}
