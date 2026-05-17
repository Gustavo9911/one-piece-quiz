@echo off
cd /d "%~dp0"
echo Construindo o projeto para docs...
npm run build
if errorlevel 1 (
  echo Falha ao buildar
  exit /b 1
)

echo Build criado em docs/ com sucesso.

echo Agora faça commit e push no branch main.
echo.
echo Sucesso! GitHub Pages esta ativo em:
echo https://Gustavo9911.github.io/one-piece-quiz/
pause
