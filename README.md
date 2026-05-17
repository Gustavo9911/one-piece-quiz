# One Piece Quiz SENAI

Quiz em React + Vite com perguntas locais de One Piece, sem API externa para perguntas e sem dependências de template não usadas.

## Rodar no Windows PowerShell

Use `npm.cmd` em vez de `npm`. Isso evita o bloqueio do arquivo `npm.ps1` pela política de execução do PowerShell.

```bash
npm.cmd install
npm.cmd run dev
```

Depois abra:

```bash
http://127.0.0.1:5173/
```

## Build e validação no Windows

```bash
npm.cmd run build
npx.cmd tsc --noEmit
npm.cmd audit
```

## Alternativa

Também funciona rodar os comandos normais em `cmd.exe` em vez de PowerShell:

```bash
npm install
npm run dev
```
