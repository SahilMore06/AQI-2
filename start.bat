@echo off
title Smart AQI + Android Launcher
color 0A
setlocal EnableExtensions EnableDelayedExpansion
set "ROOT_DIR=%~dp0"
cd /d "%ROOT_DIR%"

echo.
echo  ========================================
echo       SMART AQI CONTROL SYSTEM
echo       + ANDROID COMPANION
echo  ========================================
echo.

:: Check if we're in the right directory
if not exist "backend\main.py" (
    echo [ERROR] Please run this script from the AQI project folder
    pause
    exit /b 1
)

echo [1/6] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    pause
    exit /b 1
)
echo       Python found!

echo.
echo [2/6] Starting Backend Server...
start "AQI Backend" cmd /k "cd backend && python main.py"

echo       Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo.
echo [3/6] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo       Backend is running. Install Node.js for frontend.
    pause
    exit /b 1
)
echo       Node.js found!

echo.
echo [4/6] Starting Frontend Dashboard...
start "AQI Dashboard" cmd /k "cd frontend && npm run dev -- --host"

echo.
echo [5/6] Building for Android (Capacitor)...
echo       Building production bundle...
cd /d "%ROOT_DIR%frontend"
call npm run build
if errorlevel 1 (
    echo [WARNING] Frontend build failed. Skipping Android deploy.
    cd /d "%ROOT_DIR%"
    goto :skip_android
)

echo       Syncing to Android project...
call npx cap sync android
if errorlevel 1 (
    echo [WARNING] Capacitor sync failed. Skipping Android deploy.
    cd /d "%ROOT_DIR%"
    goto :skip_android
)

echo.
echo [6/6] Building and installing APK on device/emulator...
cd /d "%ROOT_DIR%frontend\android"

set "ADB_EXE=%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe"
set "EMULATOR_EXE=%LOCALAPPDATA%\Android\Sdk\emulator\emulator.exe"

if not exist "%ADB_EXE%" (
    where adb >nul 2>&1
    if not errorlevel 1 (
        for /f "delims=" %%A in ('where adb') do (
            set "ADB_EXE=%%A"
            goto :adb_found
        )
    )
)
:adb_found

if not exist "%ADB_EXE%" (
    echo [WARNING] adb not found. Install Android SDK platform-tools.
    cd /d "%ROOT_DIR%"
    goto :skip_android
)

set "EMULATOR_READY="
for /f %%D in ('"%ADB_EXE%" devices ^| findstr /R /C:"device$"') do set "EMULATOR_READY=1"
if not defined EMULATOR_READY (
    if exist "%EMULATOR_EXE%" (
        for /f "delims=" %%V in ('"%EMULATOR_EXE%" -list-avds') do (
            if not defined FIRST_AVD set "FIRST_AVD=%%V"
        )
        if defined FIRST_AVD (
            echo       Starting emulator "!FIRST_AVD!"...
            start "" "%EMULATOR_EXE%" -avd "!FIRST_AVD!"
            echo       Waiting for emulator to boot...
            "%ADB_EXE%" wait-for-device >nul 2>&1
            timeout /t 10 /nobreak >nul
        ) else (
            echo [WARNING] No Android Virtual Device found. Create one in Android Studio.
        )
    ) else (
        echo [WARNING] emulator.exe not found. Install Android SDK emulator component.
    )
)

call gradlew.bat assembleDebug
if errorlevel 1 (
    echo [WARNING] Gradle build failed. Check Android SDK setup.
    echo           Current JAVA_HOME: %JAVA_HOME%
    cd /d "%ROOT_DIR%"
    goto :skip_android
)

echo       Installing APK on connected device...
call gradlew.bat installDebug
if errorlevel 1 (
    echo [WARNING] APK install failed. Make sure a device/emulator is connected.
    cd /d "%ROOT_DIR%"
    goto :skip_android
)

echo       Launching Android app...
"%ADB_EXE%" shell monkey -p com.aqi.app -c android.intent.category.LAUNCHER 1 >nul 2>&1

echo       Android app installed successfully!
cd /d "%ROOT_DIR%"
goto :done

:skip_android
echo.
echo  [INFO] Android build was skipped due to errors above.
echo         Web dashboard is still running.

:done
echo.
echo  ========================================
echo       SYSTEM STARTED SUCCESSFULLY!
echo  ========================================
echo.
echo  Backend:    http://localhost:8000
echo  Dashboard:  http://localhost:5173
echo  Android:    Installed on device (if connected)
echo.
echo  Press any key to open dashboard...
pause >nul

start http://localhost:5173
