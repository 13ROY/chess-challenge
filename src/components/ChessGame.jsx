import { useChessGame } from '../hooks/useChessGame';
import ChessBoard from './ChessBoard';
import PlayerInfo from './PlayerInfo';
import GameCodeDisplay from './GameCodeDisplay';
import GameControls from './GameControls';
import MoveHistory from './MoveHistory';
import './ChessGame.css';

/**
 * Main ChessGame component
 * Refactored following SOLID principles:
 * - Single Responsibility: Delegates specific concerns to child components
 * - Open/Closed: Easy to extend with new features without modifying existing code
 * - Dependency Inversion: Depends on abstractions (child components, hooks)
 */
function ChessGame({ gameData, onSave, onBack }) {
  const {
    board,
    currentPlayer,
    gameStatus,
    moveHistory,
    isGameOver,
    handleSquareClick,
    handleNewGame,
    getCurrentPlayerName,
    isSquareSelected,
    isSquarePossibleMove,
    getPieceSymbol,
  } = useChessGame(gameData, onSave);

  return (
    <div className="chess-game">
      <div className="game-header">
        <h1>♟️ {gameData.gameName}</h1>
        <GameCodeDisplay gameCode={gameData.gameCode} />
        <PlayerInfo 
          player1Name={gameData.player1Name}
          player2Name={gameData.player2Name}
          currentPlayer={currentPlayer}
        />
      </div>

      <div className="game-content">
        <div className="board-container">
          <div className="current-turn">
            {!isGameOver && (
              <p>Current turn: <strong>{getCurrentPlayerName()}</strong> ({currentPlayer === 'w' ? 'White' : 'Black'})</p>
            )}
            {gameStatus && <p className="game-status">{gameStatus}</p>}
          </div>
          
          <ChessBoard
            board={board}
            onSquareClick={handleSquareClick}
            isSquareSelected={isSquareSelected}
            isSquarePossibleMove={isSquarePossibleMove}
            getPieceSymbol={getPieceSymbol}
          />
        </div>

        <div className="game-sidebar">
          <GameControls 
            onNewGame={handleNewGame}
            onBack={onBack}
          />
          <MoveHistory moveHistory={moveHistory} />
        </div>
      </div>
    </div>
  );
}

export default ChessGame;
