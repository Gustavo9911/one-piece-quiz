# One Piece Quiz SENAI

> Projeto de quiz de One Piece criado com React, TypeScript, Vite, Tailwind CSS e deploy via GitHub Pages.

## Índice

- [Visão Geral](#visão-geral)
- [Screenshots](#screenshots)
- [Como o projeto funciona](#como-o-projeto-funciona)
- [Estrutura de código](#estrutura-de-código)
- [Passo a passo do quiz](#passo-a-passo-do-quiz)
- [Execução local](#execução-local)
- [Deploy e GitHub Pages](#deploy-e-github-pages)
- [Scripts disponíveis](#scripts-disponíveis)
 - [Comandos (scripts)](README%20-%20commands.md)
- [Arquivos úteis](#arquivos-úteis)
- [Próximos passos](#próximos-passos)

## Visão Geral

Este projeto é um quiz de One Piece com perguntas armazenadas localmente. O foco é manter o conteúdo estável, evitar APIs externas e fornecer uma experiência visual responsiva com animações.

### Principais características

- Quiz em React + TypeScript
- Vite como bundler
- Dados de perguntas locais em `src/data/questions.ts`
- Três níveis de dificuldade: `easy`, `medium`, `hard`
- Resultados com rank e confetes
- Deploy configurado para GitHub Pages usando `docs/`
- Comando `start-quiz.bat` para iniciar facilmente no Windows

## Screenshots

> Substitua estas imagens pelos prints do seu projeto quando tiver.

![Home Screen](screenshots/home-screen.png)

![Quiz Screen](screenshots/quiz-screen.png)

![Results Screen](screenshots/results-screen.png)

## GIFs e Ilustrações

Coloquei placeholders em `screenshots/` e em `assets/`. Você pode substituir por imagens oficiais (verifique licenças) ou por artes próprias.

![Banner SVG](assets/onepiece-banner.svg)

## Créditos

- Autor: **G. G. M. Garcia**
- Projeto mantido por: **G. G. M. Garcia**

> Nota: Este repositório inclui metadados e banners visuais com o crédito do autor.

## Como o projeto funciona

O fluxo principal está em `src/app/App.tsx`, que controla as telas e o estado geral:

- `home`: tela inicial com botão de início
- `difficulty`: escolha de nível de dificuldade
- `quiz`: perguntas filtradas por dificuldade
- `results`: resultado final com rank

### Exemplo do `App.tsx`

```tsx
const [currentScreen, setCurrentScreen] = useState<Screen>('home');
const [difficulty, setDifficulty] = useState<Difficulty>('easy');
const [score, setScore] = useState(0);
const [totalQuestions, setTotalQuestions] = useState(0);

const handleStartQuiz = () => {
  setScore(0);
  setTotalQuestions(0);
  setCurrentScreen('difficulty');
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
```

## Estrutura de código

Aqui estão os principais arquivos e pastas:

- `src/app/App.tsx` — controla a navegação entre telas
- `src/app/components/HomeScreen.tsx` — tela inicial
- `src/app/components/DifficultyScreen.tsx` — seleção de dificuldade
- `src/app/components/QuizScreen.tsx` — perguntas e lógica do quiz
- `src/app/components/ResultsScreen.tsx` — resultado final e ranking
- `src/data/questions.ts` — banco de perguntas local
- `src/styles` — estilos globais e theme
- `vite.config.ts` — configura o build em `docs/`

## Passo a passo do quiz

### 1. Tela inicial

O usuário vê a tela de boas-vindas e clica em "Entrar no quiz".

### 2. Escolha de dificuldade

A tela `DifficultyScreen` mostra três caminhos:
- `EAST BLUE` (fácil)
- `GRAND LINE` (médio)
- `NEW WORLD` (difícil)

Cada cartão usa `difficultyMeta` para mostrar o número de perguntas e o estilo.

### 3. Quiz local

A lógica principal de perguntas está em `QuizScreen.tsx`.

```tsx
const quizQuestions = useMemo(() => {
  const filteredQuestions = questions.filter((question) => question.difficulty === difficulty);
  return shuffleArray(filteredQuestions).slice(0, difficultyMeta[difficulty].questionCount);
}, [difficulty]);
```

Quando o usuário seleciona uma opção, a função verifica a resposta correta e avança:

```tsx
const handleAnswerSelect = (answerIndex: number) => {
  const isCorrect = answerIndex === currentQuestion.correctAnswer;
  setScore((prevScore) => prevScore + (isCorrect ? 1 : 0));
  setShowFeedback(true);

  timeoutRef.current = window.setTimeout(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      onComplete(nextScore, quizQuestions.length);
    }
  }, 1800);
};
```

### 4. Resultado e rank

A tela `ResultsScreen` calcula o percentual, escolhe um rank e dispara confetes quando o jogador acerta bem.

```tsx
const percentage = total > 0 ? (score / total) * 100 : 0;
const currentRank = [...ranks].reverse().find((rank) => percentage >= rank.minScore) || ranks[0];
```

## Execução local

### Requisitos

- Node.js 20+
- npm ou pnpm

### Rodar no Windows PowerShell

```powershell
npm.cmd install
npm.cmd run dev
```

Abra depois:

```text
http://127.0.0.1:5173/
```

### Alternativa no cmd.exe

```cmd
npm install
npm run dev
```

### Iniciar com script Windows

```cmd
start-quiz.bat
```

Esse script instala dependências se necessário e inicia o servidor Vite.

## Deploy e GitHub Pages

O projeto está configurado para gerar a pasta `docs/` durante o build:

```bash
npm run build
```

Depois, o GitHub Pages pode ser configurado para servir a partir de `main` / `docs`.

Também existe workflow de Actions em `.github/workflows/deploy-pages.yml` para publicar automaticamente quando houver push em `main`.

## Scripts disponíveis

No `package.json` existem os comandos principais:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "start": "vite",
  "preview": "vite preview",
  "deploy": "npm run build"
}
```

### Uso recomendado

- `npm run dev` — roda o app em modo desenvolvimento
- `npm run build` — gera `docs/` para deploy
- `npm run preview` — testa a build localmente

Veja também os comandos detalhados em: [README - commands](README%20-%20commands.md)

## Arquivos úteis

- `start-quiz.bat` — inicia o projeto no Windows
- `publish-pages.bat` — builda o projeto para GitHub Pages
- `setup.bat` — instala dependências
- `.github/workflows/deploy-pages.yml` — workflow de CI/CD para GitHub Pages

## Próximos passos

- Adicionar capturas de tela reais em `screenshots/`
- Incluir novos níveis de perguntas e explicações extras
- Criar versão mobile-first ainda mais otimizada
- Adicionar suporte a múltiplos idiomas

---

### Links rápidos

- [Visão Geral](#visão-geral)
- [Como o projeto funciona](#como-o-projeto-funciona)
- [Execução local](#execução-local)
- [Deploy e GitHub Pages](#deploy-e-github-pages)
