@echo off
title AQI PULSE - Awwwards Level Application
color 0A
setlocal EnableExtensions EnableDelayedExpansion
set "ROOT_DIR=%~dp0"
cd /d "%ROOT_DIR%"

echo.
echo  ==========================================
echo           AQI PULSE - VITE APP
echo       Glassmorphic Dark Science Design
echo  ==========================================
echo     🌍 3D Globe + ⚡ GSAP + 🎭 Framer Motion
echo  ==========================================
echo.

:: -------------------------------------------
::  Check prerequisites
:: -------------------------------------------
echo [*] Checking environment...

if not exist "package.json" (
    echo [ERROR] Vite project not found. Please run from AQI project folder.
    pause
    exit /b 1
)

if not exist "backend\main.py" (
    echo [ERROR] Backend not found. Please run from AQI project folder.
    pause
    exit /b 1
)

echo [*] Checking Python...
where python >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH.
    echo         Download from: https://python.org
    pause
    exit /b 1
)
echo     ✓ Python found

echo [*] Checking Node.js...
where node >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH.
    echo         Download from: https://nodejs.org
    pause
    exit /b 1
)
echo     ✓ Node.js found

echo [*] Checking npm...
where npm >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm not found with Node.js installation.
    pause
    exit /b 1
)
echo     ✓ npm found
echo.

:: -------------------------------------------
::  Menu
:: -------------------------------------------
:menu
echo  ==========================================
echo   🚀 AQI PULSE - LAUNCH OPTIONS
echo  ==========================================
echo.
echo   RECOMMENDED:
echo   [1]  🎯 Quick Start      (Backend + App, auto-open browser)
echo.
echo   ADVANCED:
echo   [2]  🔧 Start Everything (Backend + App, manual)
echo   [3]  ⚡ Dev Server Only  (Vite dev server only)
echo   [4]  📦 Build Production (Create dist/ folder)
echo   [5]  🔍 Preview Build    (Built app preview)
echo.
echo   [0]  ❌ Exit
echo.
set /p "CHOICE=  👉 Enter your choice (0-5): "

if "%CHOICE%"=="1" goto :quick_start
if "%CHOICE%"=="2" goto :run_everything
if "%CHOICE%"=="3" goto :run_vite_dev
if "%CHOICE%"=="4" goto :run_vite_build
if "%CHOICE%"=="5" goto :run_vite_preview
if "%CHOICE%"=="0" goto :exit
echo.
echo  ❌ Invalid choice. Please enter 0-5.
echo.
goto :menu

:: -------------------------------------------
::  Start Backend Server
:: -------------------------------------------
:start_backend
echo  ========================================
echo   🔧 Starting FastAPI Backend...
echo  ========================================
cd /d "%ROOT_DIR%backend"
echo     📦 Installing Python dependencies...
pip install -r requirements.txt --quiet 2>nul
if errorlevel 1 (
    echo     ⚠️  Warning: Some pip packages may have failed to install
)
start "AQI PULSE Backend" cmd /k "cd /d %ROOT_DIR%backend && python main.py"
echo     ✅ Backend starting on http://localhost:8000
timeout /t 3 /nobreak >nul
cd /d "%ROOT_DIR%"
goto :eof

:: -------------------------------------------
::  Option 1 - Quick Start (Recommended)
:: -------------------------------------------
:quick_start
echo.
echo  ==========================================
echo   🎯 QUICK START - AQI PULSE
echo  ==========================================
echo.

:: Start Backend
echo 🔧 [1/3] Starting FastAPI Backend...
cd /d "%ROOT_DIR%backend"
pip install -r requirements.txt --quiet 2>nul
start "AQI PULSE Backend" cmd /k "cd /d %ROOT_DIR%backend && echo Starting AQI PULSE Backend... && python main.py"
echo     ✅ Backend starting on http://localhost:8000
timeout /t 2 /nobreak >nul

:: Install dependencies if needed
echo ⚡ [2/3] Preparing Vite App...
cd /d "%ROOT_DIR%"
if not exist "node_modules" (
    echo     📦 Installing Node.js dependencies (first time setup)...
    call npm install --silent
    if errorlevel 1 (
        echo     ❌ npm install failed. Please run manually: npm install
        pause
        exit /b 1
    )
    echo     ✅ Dependencies installed successfully!
) else (
    echo     ✅ Dependencies already installed
)

:: Start Vite App
echo 🚀 [3/3] Launching Vite Development Server...
start "AQI PULSE Vite App" cmd /k "cd /d %ROOT_DIR% && echo Starting AQI PULSE Vite App... && npm run dev"

echo.
echo  ==========================================
echo   🎉 AQI PULSE IS NOW RUNNING!
echo  ==========================================
echo.
echo   🔗 Backend API:     http://localhost:8000
echo   🌐 Vite App:        http://localhost:3000+ (auto-port)
echo.
echo   🎨 Design:          Glassmorphic Dark Science
echo   ⚡ Tech Stack:      Vite + React + Three.js + GSAP
echo.

:: Intelligent browser opening
echo   🌐 Opening app in browser...
timeout /t 3 /nobreak >nul

:: Try common ports in sequence
start "" "http://localhost:3000" >nul 2>&1
timeout /t 1 /nobreak >nul
start "" "http://localhost:3001" >nul 2>&1
timeout /t 1 /nobreak >nul
start "" "http://localhost:3002" >nul 2>&1

echo.
echo   📋 QUICK REFERENCE:
echo   • Both servers are running in separate windows
echo   • Close those windows to stop the servers
echo   • Check browser for the app (may auto-refresh)
echo.
echo   ✨ Enjoy your Awwwards-level AQI monitoring experience!
echo.
echo Press any key to return to menu...
pause >nul
goto :menu
:: -------------------------------------------
::  Option 2 - Start Everything (Manual)
:: -------------------------------------------
:run_everything
echo.
echo  ========================================
echo   🔧 MANUAL START - Starting Everything...
echo  ========================================

:: Start Backend
echo [1/2] Starting FastAPI Backend...
cd /d "%ROOT_DIR%backend"
pip install -r requirements.txt --quiet 2>nul
start "AQI PULSE Backend" cmd /k "cd /d %ROOT_DIR%backend && python main.py"
echo       ✅ Backend starting on http://localhost:8000

:: Wait a moment for backend to initialize
timeout /t 3 /nobreak >nul

:: Start Vite App
echo [2/2] Starting Vite Development Server...
cd /d "%ROOT_DIR%"
if not exist "node_modules" (
    echo       📦 Installing dependencies...
    call npm install --silent
    if errorlevel 1 (
        echo [ERROR] npm install failed.
        pause
        exit /b 1
    )
)

start "AQI PULSE Vite App" cmd /k "cd /d %ROOT_DIR% && npm run dev"

echo.
echo  ==========================================
echo        🎉 AQI PULSE IS NOW RUNNING!
echo  ==========================================
echo.
echo   🔗 Backend API:     http://localhost:8000
echo   🌐 Vite App:        http://localhost:3000+ (auto-port)
echo.
echo   🎨 Design System:   Glassmorphic Dark Science
echo   ⚡ Tech Stack:      Vite + React + Three.js + GSAP
echo.
echo   📋 Manual browser opening...
echo   👉 Please open: http://localhost:3000 (or check console for actual port)
echo.
echo   Both servers are running in separate windows.
echo   Close those windows to stop the servers.
echo.
cd /d "%ROOT_DIR%"
pause
goto :exit

:: -------------------------------------------
::  Option 3 - Vite Dev Server Only
:: -------------------------------------------
:run_vite_dev
echo.
call :start_backend

echo  ========================================
echo   ⚡ Starting Vite Dev Server Only...
echo  ========================================
cd /d "%ROOT_DIR%"
if not exist "node_modules" (
    echo     📦 Installing Vite dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed.
        pause
        exit /b 1
    )
)

echo.
echo  ========================================
echo   🚀 Launching Vite Development Server...
echo  ========================================
start "AQI PULSE Vite" cmd /k "cd /d %ROOT_DIR% && npm run dev"

echo.
echo  ========================================
echo      ⚡ VITE APP RUNNING!
echo  ========================================
echo.
echo   🔗 Backend:  http://localhost:8000
echo   🌐 Vite App: http://localhost:3000+ (auto-port)
echo   🎨 Design:   Glassmorphic Dark Science
echo.
cd /d "%ROOT_DIR%"
pause
goto :exit

:: -------------------------------------------
::  Option 4 - Vite Build Production
:: -------------------------------------------
:run_vite_build
echo.
echo  ========================================
echo   📦 Building Vite Production...
echo  ========================================
cd /d "%ROOT_DIR%"
if not exist "node_modules" (
    echo     📦 Installing dependencies first...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed.
        pause
        exit /b 1
    )
)

echo     🔨 Building optimized production bundle...
call npm run build
if errorlevel 1 (
    echo [ERROR] Vite build failed.
    pause
    exit /b 1
)

echo.
echo  ========================================
echo     ✅ VITE BUILD COMPLETED!
echo  ========================================
echo.
echo   📁 Build files:  dist\
echo   🎨 Design:       Glassmorphic Dark Science
echo   🔧 To serve:     npm run preview
echo   📦 To deploy:    Upload dist\ folder to web server
echo.
echo   Opening build folder...
start explorer "dist" >nul 2>&1
echo.
cd /d "%ROOT_DIR%"
pause
goto :exit

:: -------------------------------------------
::  Option 5 - Preview Built App
:: -------------------------------------------
:run_vite_preview
echo.
echo  ========================================
echo   🔍 Starting Production Preview...
echo  ========================================
cd /d "%ROOT_DIR%"

if not exist "dist" (
    echo     📦 No build found. Building first...
    if not exist "node_modules" (
        call npm install
    )
    call npm run build
    if errorlevel 1 (
        echo [ERROR] Build failed.
        pause
        exit /b 1
    )
)

echo     🔧 Starting production preview server...
start "AQI PULSE Preview" cmd /k "cd /d %ROOT_DIR% && npm run preview"

echo.
echo  ========================================
echo      🔍 PRODUCTION PREVIEW RUNNING!
echo  ========================================
echo.
echo   🌐 Preview URL: http://localhost:4173 (typical)
echo   📁 Serving from: dist\
echo   🎨 Mode: Production optimized
echo.
cd /d "%ROOT_DIR%"
pause
goto :exit

:: -------------------------------------------
::  Exit
:: -------------------------------------------
:exit
echo.
echo  ==========================================
echo   👋 Thanks for using AQI PULSE!
echo  ==========================================
echo.
echo   🎉 Created with Awwwards-level design
echo   ⚡ Powered by Vite + React + Three.js
echo.
echo   Have a great day! 🌟
echo.
exit /b 0