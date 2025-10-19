# Component Architecture

This chess application follows SOLID principles for maintainability and readability.

## Component Structure

### Main Components

- **ChessGame** (`ChessGame.jsx`) - Main container component that orchestrates the game
- **ChessBoard** (`ChessBoard.jsx`) - Displays the chess board and handles square rendering
- **PlayerInfo** (`PlayerInfo.jsx`) - Shows player names and indicates whose turn it is
- **GameCodeDisplay** (`GameCodeDisplay.jsx`) - Displays the shareable game code
- **GameControls** (`GameControls.jsx`) - Contains action buttons (New Game, Back to Menu)
- **MoveHistory** (`MoveHistory.jsx`) - Displays the list of moves made

### Custom Hooks

- **useChessGame** (`hooks/useChessGame.js`) - Custom hook that encapsulates all chess game logic including:
  - Game state management
  - Move validation and execution
  - Game status detection (check, checkmate, stalemate)
  - Piece selection and movement

## SOLID Principles Applied

### Single Responsibility Principle
Each component has a single, well-defined responsibility:
- `ChessBoard`: Only renders the board
- `PlayerInfo`: Only displays player information
- `GameControls`: Only handles user actions
- `MoveHistory`: Only displays move history
- `useChessGame`: Only manages game logic

### Open/Closed Principle
Components are open for extension but closed for modification. New features can be added by creating new components rather than modifying existing ones.

### Dependency Inversion Principle
The main `ChessGame` component depends on abstractions (child components and hooks) rather than concrete implementations. This makes it easy to swap out implementations.

## Benefits

1. **Maintainability**: Each component is small and focused, making it easy to understand and modify
2. **Testability**: Individual components can be tested in isolation
3. **Reusability**: Components like `ChessBoard` and `MoveHistory` can be reused in other contexts
4. **Readability**: Clear separation of concerns makes the code easier to understand
