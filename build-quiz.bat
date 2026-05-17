@echo off
cd /d "%~dp0"
if not exist "node_modules\.bin\vite.cmd" (
  echo Dependencias nao encontradas. Instalando...
  call setup.bat
  if errorlevel 1 exit /b 1
)
echo Construindo a aplicacao One Piece Quiz...
node_modules\.bin\vite.cmd build
