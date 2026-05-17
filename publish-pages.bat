@echo off
cd /d "%~dp0"
echo Instalando gh-pages...
npm install --save-dev gh-pages
if errorlevel 1 (
  echo Falha ao instalar gh-pages
  exit /b 1
)

echo Construindo o projeto...
npm run build
if errorlevel 1 (
  echo Falha ao buildar
  exit /b 1
)

echo Publicando no GitHub Pages...
npx gh-pages -d dist
if errorlevel 1 (
  echo Falha ao publicar
  exit /b 1
)

echo.
echo Sucesso! GitHub Pages esta ativo em:
echo https://Gustavo9911.github.io/one-piece-quiz/
pause
