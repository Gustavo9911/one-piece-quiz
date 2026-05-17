@echo off
cd /d "%~dp0"
echo Instalando dependencias do One Piece Quiz...
npm install
if errorlevel 1 (
  echo Falha ao instalar dependencias.
  exit /b 1
)
echo Dependencias instaladas com sucesso.
