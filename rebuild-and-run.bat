@echo off
echo === Interview Coder - Rebuild and Run Helper ===
echo.

REM Set working directory to the script's location
cd /D "%~dp0"

echo === Step 1: Clean previous build ===
call npm run clean
if %ERRORLEVEL% NEQ 0 (
    echo Error cleaning the project.
    goto error
)

echo === Step 2: Building the application ===
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Error building the project.
    goto error
)

echo === Step 3: Starting the application ===
echo.
echo Starting the application in stealth mode...
echo IMPORTANT USAGE INSTRUCTIONS:
echo.
echo 1. Press Ctrl+B to make the window visible!
echo 2. Click the settings gear to open settings
echo 3. Select your preferred API (OpenAI recommended for larger screenshots)
echo 4. Enter your API key and select "English Mode" for language exercises
echo 5. Use Ctrl+H to take screenshots, then Ctrl+Enter to process them
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