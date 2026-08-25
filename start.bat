@echo off
setlocal enabledelayedexpansion

:: Navigate to script directory
cd /d "%~dp0"

title Altaf Khan Portfolio - Dev Server
color 0B

echo.
echo  =============================================================
echo    Altaf Khan - Modern Portfolio Development Server
echo  =============================================================
echo.

:: Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo  [ERROR] Node.js is not installed or not in your PATH.
    echo  Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: Check node_modules
if not exist "node_modules\" (
    echo  [INFO] node_modules not found. Running npm install...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo.
        echo  [ERROR] npm install failed. Please check your network and try again.
        echo.
        pause
        exit /b 1
    )
)

echo  [OK] Starting Craco development server...
echo  Local URL: http://localhost:3000
echo  Press Ctrl+C anytime to stop the server.
echo.

call npm start

if %errorlevel% neq 0 (
    echo.
    echo  [INFO] Server stopped or exited with code %errorlevel%.
    pause
)
