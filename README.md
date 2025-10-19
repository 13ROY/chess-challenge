# Chess Challenge - 2 Player Chess Game

A fully functional 2-player chess game built with React (Vite) that runs entirely in the browser with local storage persistence.

## Features

✅ **2-Player Gameplay**: Play chess with a friend on the same device or across devices  
✅ **Local Storage Persistence**: All game state is saved automatically to browser's local storage  
✅ **Multiple Saved Games**: Support for multiple games with user-defined names  
✅ **Player Names**: Enter and display custom player names  
✅ **Resume Games**: Continue games after disconnects or page refreshes  
✅ **Move History**: Track all moves made during the game  
✅ **Real-time Updates**: Board updates immediately after each move  
✅ **Valid Move Highlighting**: Shows possible moves when a piece is selected  
✅ **Game State Detection**: Detects checkmate, stalemate, check, and draw conditions  

## Screenshots

### Start Screen
![Start Screen](https://github.com/user-attachments/assets/664c3fac-fde2-4d2b-8f0d-6d0f4ec063e8)

### New Game Form
![New Game Form](https://github.com/user-attachments/assets/ef245b74-481e-43a4-8d95-19761b38fe0e)

### Chess Board - Initial Position
![Chess Board Initial](https://github.com/user-attachments/assets/4a003b66-bdfd-44e8-aeb3-3a6df7bb27ad)

### Game in Progress with Move History
![Game in Progress](https://github.com/user-attachments/assets/bc684ae8-9ade-4f2e-a92f-b3173d690911)

### Saved Games List
![Saved Games](https://github.com/user-attachments/assets/7013b3c5-7611-4c18-8951-f4b573616770)

## How to Play

1. **Start a New Game**: Click "Start New Game" and enter game name and player names
2. **Make Moves**: Click a piece to select it, then click the destination square
3. **Auto-Save**: Game state is automatically saved after each move
4. **Resume**: Return to the menu and resume any saved game
5. **Multiple Games**: Create and manage multiple chess games simultaneously

## Installation & Running

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technology Stack

- **React 19**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **chess.js**: Chess game logic and move validation
- **Local Storage API**: Browser-based game persistence
- **CSS3**: Custom styling for chess board and UI

## Game Storage

All games are stored in the browser's local storage under the key `chess-games`. Each game includes:
- Game ID and name
- Player names
- Current board position (FEN notation)
- Complete move history
- Last updated timestamp

## Development

```bash
# Run linter
npm run lint

# Build project
npm run build
```

## Browser Compatibility

Works in all modern browsers that support:
- ES6+ JavaScript
- Local Storage API
- CSS Grid/Flexbox

