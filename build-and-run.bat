@echo off
echo === Interview Coder - Build and Run Helper ===
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
echo REMEMBER: Use Ctrl+B to make the window visible!
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