# Interview Coder Build Instructions

Follow these steps to build and run the application:

## Initial Setup

1. **Open Command Prompt (CMD) or PowerShell** in Windows (not WSL)

2. **Navigate to the project directory**:
   ```
   cd "C:\Projetos Computação\Pessoais\interview-coder"
   ```

3. **Clean existing build artifacts and reinstall dependencies**:
   ```
   rmdir /s /q node_modules
   del package-lock.json
   npm install
   ```

## Building the Application

1. **Clean previous builds**:
   ```
   npm run clean
   ```

2. **Build the application**:
   ```
   npm run build
   ```

3. **Run the application**:
   ```
   npm run run-prod
   ```

   Alternatively, you can use the stealth mode script:
   ```
   stealth-run.bat
   ```

## Creating Desktop Shortcut

1. After building the application successfully, run:
   ```
   create-desktop-shortcut.bat
   ```

2. A shortcut will be created on your desktop

3. You can use this shortcut to launch Interview Coder without needing a terminal window

## Troubleshooting

If you encounter any issues:

1. **Build errors**:
   - Make sure you have Node.js 16+ installed
   - Try running `npm run clean` before building again
   - If you get dependency errors, delete node_modules and reinstall: `npm install`

2. **Runtime errors**:
   - Check that the application is properly built (dist and dist-electron directories should exist)
   - Press Ctrl+B multiple times to make the window visible
   - Increase opacity with Ctrl+] if the window is too transparent

## Using English Mode

1. After launching the application, press Ctrl+B to make it visible

2. Click the settings icon (gear) in the top right

3. In the settings dialog, select "English Mode" under "Exercise Mode"

4. Take screenshots of English exercises using Ctrl+H

5. Process them with Ctrl+Enter

Remember that the application is invisible by default! Use Ctrl+B to toggle visibility.