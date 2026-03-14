@echo off
title AQI System - Dependency Installer
color 0B

echo.
echo  ========================================
echo     INSTALLING DEPENDENCIES
echo  ========================================
echo.

:: Backend dependencies
echo [1/2] Installing Python dependencies...
cd backend
pip install -r requirements.txt
if errorlevel 1 (
    echo [ERROR] Failed to install Python dependencies
    pause
    exit /b 1
)
echo       Backend dependencies installed!
cd ..

:: Frontend dependencies
echo.
echo [2/2] Installing Node.js dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install Node.js dependencies
    pause
    exit /b 1
)
echo       Frontend dependencies installed!
cd ..

echo.
echo  ========================================
echo     ALL DEPENDENCIES INSTALLED!
echo  ========================================
echo.
echo  Run start.bat to launch the system.
echo.
pause
