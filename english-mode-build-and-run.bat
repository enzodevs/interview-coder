@echo off
echo === Interview Coder - English Mode Fix ===
echo.

REM Set working directory to the script's location
cd /D "%~dp0"

echo === Step 1: Clean previous build ===
call npm run clean
if %ERRORLEVEL% NEQ 0 (
    echo Error cleaning the project.
    goto error
)

echo === Step 2: Building the application with English mode fixes ===
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Error building the project.
    goto error
)

echo === Step 3: Starting the application ===
echo.
echo Starting the application in stealth mode...
echo.
echo ========== IMPORTANT INSTRUCTIONS ==========
echo 1. Press Ctrl+B to make the window visible!
echo 2. Click the settings gear icon
echo 3. Select "English Mode" under "Exercise Mode"
echo 4. OpenAI is recommended for English exercises
echo 5. Take screenshots of exercises with Ctrl+H
echo 6. Process with Ctrl+Enter
echo 7. The app now parses responses properly for English learning
echo ============================================
echo.

start /B cmd /c "set NODE_ENV=production && npx electron ./dist-electron/main.js"

echo Application started! Press Ctrl+B to make the window visible.
echo.
goto :eof

:error
echo.
echo An error occurred. Please check the logs above for details.
pause
exit /b 1