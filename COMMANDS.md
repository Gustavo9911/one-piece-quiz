# Comandos do One Piece Quiz

Este documento é um segundo README dedicado apenas aos comandos e scripts usados no projeto.

## Índice

- [Instalação](#instalação)
- [Execução local](#execução-local)
- [Build para deploy](#build-para-deploy)
- [Comandos Git](#comandos-git)
- [Scripts em lote do Windows](#scripts-em-lote-do-windows)
- [Dicas para PowerShell](#dicas-para-powershell)

## Instalação

Antes de executar o projeto pela primeira vez, instale as dependências:

```powershell
npm.cmd install
```

Se você estiver usando `cmd.exe`, execute:

```cmd
npm install
```

## Execução local

Para rodar o app no ambiente de desenvolvimento com Vite:

```powershell
npm.cmd run dev
```

Ou em `cmd.exe`:

```cmd
npm run dev
```

Depois abra no navegador:

```text
http://127.0.0.1:5173/
```

## Build para deploy

Gerar a versão de produção em `docs/`:

```powershell
npm.cmd run build
```

Verificar a build localmente:

```powershell
npm.cmd run preview
```

## Comandos Git

Verificar o estado do repositório:

```bash
git status --short --branch
```

Adicionar arquivos para commit:

```bash
git add .
```

Fazer commit:

```bash
git commit -m "Mensagem do commit"
```

Sincronizar com o remoto:

```bash
git pull --rebase origin main
```

Enviar para o GitHub:

```bash
git push origin main
```

## Scripts em lote do Windows

O projeto contém scripts `.bat` para facilitar o uso no Windows.

### `setup.bat`

Instala dependências do projeto se ainda não estiverem presentes.

```batch
@echo off
cd /d "%~dp0"
echo Instalando dependencias do One Piece Quiz...
npm install
if errorlevel 1 (
  echo Falha ao instalar dependencias.
  exit /b 1
)
echo Dependencias instaladas com sucesso.
```

### `start-quiz.bat`

Script criado para iniciar o projeto com um duplo clique:

```batch
@echo off
cd /d "%~dp0"
if not exist "node_modules" (
  echo Instalando dependencias...
  npm install
  if errorlevel 1 (
    echo Falha ao instalar dependencias.
    pause
    exit /b 1
  )
)
echo Iniciando o One Piece Quiz...
call node_modules\.bin\vite.cmd --host --open
```

Use este arquivo para ligar o app imediatamente.

### `build-quiz.bat`

Compila a aplicação usando Vite:

```batch
@echo off
cd /d "%~dp0"
if not exist "node_modules\.bin\vite.cmd" (
  echo Dependencias nao encontradas. Instalando...
  call setup.bat
  if errorlevel 1 exit /b 1
)
echo Construindo a aplicacao One Piece Quiz...
node_modules\.bin\vite.cmd build
```

### `publish-pages.bat`

Cria a build para GitHub Pages em `docs/`:

```batch
@echo off
cd /d "%~dp0"
echo Construindo o projeto para docs...
npm run build
if errorlevel 1 (
  echo Falha ao buildar
  exit /b 1
)

echo Build criado em docs/ com sucesso.
echo Agora faca commit e push no branch main.
echo.
echo Sucesso! GitHub Pages esta ativo em:
echo https://Gustavo9911.github.io/one-piece-quiz/
pause
```

### Resumo dos scripts

- `start-quiz.bat`: inicia o app local, instalando dependências se necessário
- `setup.bat`: instala dependências
- `build-quiz.bat`: executa o build Vite manualmente
- `publish-pages.bat`: gera a pasta `docs/` para deployment

## Dicas para PowerShell

Se o PowerShell bloquear `npm` por política de execução, use os arquivos `npm.cmd` ou execute os comandos em `cmd.exe`.

- Use `npm.cmd install` em vez de `npm install` no PowerShell
- Use `npx.cmd` em vez de `npx`

Isso evita erros como "execution of script is disabled on this system".
