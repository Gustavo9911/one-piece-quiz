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
