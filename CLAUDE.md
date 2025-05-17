# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run clean` | Remove build artifacts (dist and dist-electron directories) |
| `npm run dev` | Start the app in development mode with hot reloading |
| `npm run build` | Build the app for production |
| `npm run run-prod` | Run the built app in production mode |
| `npm run lint` | Run ESLint to check for code quality issues |
| `npm run package` | Build and package the app for distribution |
| `npm run package-mac` | Build and package the app for macOS |
| `npm run package-win` | Build and package the app for Windows |

### Running the Application

```bash
# Install dependencies
npm install

# Clean any previous builds (recommended)
npm run clean

# Run in development mode
npm run dev

# For stealth mode (production mode with invisibility)
# On Windows:
stealth-run.bat

# On macOS/Linux:
chmod +x stealth-run.sh
./stealth-run.sh
```

Note: The application window is invisible by default. Use `Ctrl+B` (or `Cmd+B` on Mac) to toggle visibility.

## Application Architecture

### Core Components

1. **Electron Main Process** (`electron/main.ts`)
   - Sets up the invisible window
   - Manages the app's lifecycle 
   - Handles IPC communication with the renderer
   - Registers global shortcuts
   - Contains state management for window position, size, and visibility

2. **Processing System** (`electron/ProcessingHelper.ts`)
   - Handles screenshot analysis through AI APIs
   - Extracts problem requirements from screenshots
   - Generates coding solutions
   - Provides debugging assistance
   - Supports multiple AI providers (OpenAI, Gemini, Claude)

3. **Screenshot System** (`electron/ScreenshotHelper.ts`)
   - Captures and manages screenshots
   - Maintains queues for initial screenshots and debug screenshots

4. **Configuration** (`electron/ConfigHelper.ts`)
   - Manages user settings (API keys, model selection, language preferences)
   - Persists configuration between sessions

5. **React UI** (`src/App.tsx` and components)
   - Provides user interface for controlling the application
   - Displays processing results, solutions, and debug information
   - Offers settings configuration via Settings Dialog

### Data Flow

1. **Screenshot Capture**
   - User takes screenshots using global shortcuts
   - Screenshots are stored locally and added to queue
   - UI displays screenshot previews

2. **Problem Processing**
   - User initiates processing with global shortcut
   - Screenshots are analyzed by AI to extract problem
   - AI generates solution with time/space complexity analysis
   - Results displayed in the solutions view

3. **Debugging**
   - User can take additional screenshots of errors/code
   - AI analyzes issues and provides debugging assistance
   - Results shown in the debug view

### Key Files and Their Purposes

- `electron/main.ts`: Main Electron process, window management, and shortcuts
- `electron/ProcessingHelper.ts`: AI integration for problem analysis, solution generation, and debugging
- `electron/ScreenshotHelper.ts`: Screenshot capture, storage, and management
- `electron/ConfigHelper.ts`: Configuration management and persistence
- `src/components/Settings/SettingsDialog.tsx`: UI for configuring API keys, models, and preferences
- `src/components/Queue/ScreenshotQueue.tsx`: UI for managing captured screenshots
- `src/components/Solutions/SolutionCommands.tsx`: UI for displaying and managing solutions
- `src/components/shared/LanguageSelector.tsx`: UI for selecting programming languages

## Integration Points

### AI Service Integration

The application is designed with a modular API provider system:

- `electron/ProcessingHelper.ts` manages AI model integration
- Currently supports OpenAI, Gemini, and Claude APIs
- Each model can be configured for different stages:
  - Problem extraction (vision API)
  - Solution generation
  - Debugging assistance

### UI Customization

- Component-based React UI with Tailwind CSS
- Radix UI components for dialogs, toasts, etc.

## Configuration Management

User settings are stored in:
- Windows: `C:\Users\[USERNAME]\AppData\Roaming\interview-coder-v1\config.json`
- macOS: `/Users/[USERNAME]/Library/Application Support/interview-coder-v1/config.json`

The config file contains:
- API keys for different providers
- Selected AI models for each processing stage
- Preferred programming language
- Window opacity settings

## Important Environment Variables

All environment variables are loaded from `.env` in development mode, or from the resources directory in production.

## Testing

There are currently no automated tests in the project. Future contributors are encouraged to add tests.