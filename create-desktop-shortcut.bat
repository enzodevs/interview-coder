@echo off
echo === Creating Desktop Shortcut for Interview Coder ===
echo.

REM Get the current directory where the batch file is located
set "CURRENT_DIR=%~dp0"

REM Create a variable for the desktop location
for /f "tokens=2* delims= " %%a in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders" /v Desktop') do set "DESKTOP_DIR=%%b"

REM Check if we found the Desktop directory
if not exist "%DESKTOP_DIR%" (
    echo Unable to locate Desktop folder.
    goto :ERROR
)

echo Current Directory: %CURRENT_DIR%
echo Desktop Directory: %DESKTOP_DIR%

REM Create the VBScript file that will create a proper shortcut
echo Creating shortcut script...
set "VBS_FILE=%TEMP%\CreateInterviewCoderShortcut.vbs"

echo Set oWS = WScript.CreateObject("WScript.Shell") > "%VBS_FILE%"
echo sLinkFile = "%DESKTOP_DIR%\Interview Coder.lnk" >> "%VBS_FILE%"
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%VBS_FILE%"
echo oLink.TargetPath = "%CURRENT_DIR%stealth-run.bat" >> "%VBS_FILE%"
echo oLink.WorkingDirectory = "%CURRENT_DIR%" >> "%VBS_FILE%"
echo oLink.Description = "Start Interview Coder in stealth mode" >> "%VBS_FILE%"
echo oLink.IconLocation = "%CURRENT_DIR%assets\icons\win\icon.ico" >> "%VBS_FILE%"
echo oLink.Save >> "%VBS_FILE%"

REM Run the VBScript to create the shortcut
echo Running shortcut creation script...
cscript //nologo "%VBS_FILE%"

REM Check if shortcut was created
if exist "%DESKTOP_DIR%\Interview Coder.lnk" (
    echo.
    echo Desktop shortcut created successfully!
    echo Location: "%DESKTOP_DIR%\Interview Coder.lnk"
    echo.
    echo You can now launch Interview Coder directly from your desktop.
    echo Remember to use Ctrl+B to make the window visible after launch!
) else (
    echo.
    echo Failed to create shortcut.
    goto :ERROR
)

REM Clean up temporary VBScript file
del "%VBS_FILE%" > nul 2>&1

goto :EOF

:ERROR
echo.
echo An error occurred while creating the shortcut.
echo Please make sure you have permission to create shortcuts on your desktop.
echo.
pause
exit /b 1