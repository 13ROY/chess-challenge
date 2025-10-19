import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import './ChessGame.css';

function ChessGame({ gameData, onSave, onBack }) {
  const [chess] = useState(() => {
    const game = new Chess();
    if (gameData.fen) {
      game.load(gameData.fen);
    }
    return game;
  });
  
  const [board, setBoard] = useState(chess.board());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(chess.turn());
  const [gameStatus, setGameStatus] = useState('');
  const [moveHistory, setMoveHistory] = useState(gameData.history || []);

  useEffect(() => {
    updateGameStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer]);

  const updateGameStatus = () => {
    if (chess.isCheckmate()) {
      const winner = chess.turn() === 'w' ? gameData.player2Name : gameData.player1Name;
      setGameStatus(`Checkmate! ${winner} wins!`);
    } else if (chess.isDraw()) {
      setGameStatus('Game drawn!');
    } else if (chess.isStalemate()) {
      setGameStatus('Stalemate!');
    } else if (chess.isCheck()) {
      setGameStatus('Check!');
    } else {
      setGameStatus('');
    }
  };

  const getPieceSymbol = (piece) => {
    if (!piece) return null;
    
    const symbols = {
      'k': '♔', 'q': '♕', 'r': '♖', 'b': '♗', 'n': '♘', 'p': '♙',
      'K': '♚', 'Q': '♛', 'R': '♜', 'B': '♝', 'N': '♞', 'P': '♟',
    };
    
    const key = piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase();
    return symbols[key];
  };

  const handleSquareClick = (row, col) => {
    const square = String.fromCharCode(97 + col) + (8 - row);
    
    if (selectedSquare) {
      // Try to make a move
      const move = {
        from: selectedSquare,
        to: square,
        promotion: 'q', // Always promote to queen for simplicity
      };
      
      try {
        const result = chess.move(move);
        if (result) {
          const newHistory = [...moveHistory, result.san];
          setBoard(chess.board());
          setCurrentPlayer(chess.turn());
          setSelectedSquare(null);
          setPossibleMoves([]);
          setMoveHistory(newHistory);
          
          // Auto-save after each move
          onSave({
            fen: chess.fen(),
            history: newHistory,
          });
        } else {
          // If move failed, try selecting the new square
          selectSquare(square);
        }
      } catch {
        // If move failed, try selecting the new square
        selectSquare(square);
      }
    } else {
      selectSquare(square);
    }
  };

  const selectSquare = (square) => {
    const piece = chess.get(square);
    if (piece && piece.color === chess.turn()) {
      setSelectedSquare(square);
      const moves = chess.moves({ square, verbose: true });
      setPossibleMoves(moves.map(m => m.to));
    } else {
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  const handleNewGame = () => {
    if (window.confirm('Start a new game? Current progress will be saved.')) {
      chess.reset();
      setBoard(chess.board());
      setCurrentPlayer('w');
      setSelectedSquare(null);
      setPossibleMoves([]);
      setMoveHistory([]);
      setGameStatus('');
      onSave({
        fen: chess.fen(),
        history: [],
      });
    }
  };

  const getCurrentPlayerName = () => {
    return currentPlayer === 'w' ? gameData.player1Name : gameData.player2Name;
  };

  const isSquareSelected = (row, col) => {
    if (!selectedSquare) return false;
    const square = String.fromCharCode(97 + col) + (8 - row);
    return selectedSquare === square;
  };

  const isSquarePossibleMove = (row, col) => {
    const square = String.fromCharCode(97 + col) + (8 - row);
    return possibleMoves.includes(square);
  };

  const isGameOver = chess.isGameOver();

  return (
    <div className="chess-game">
      <div className="game-header">
        <h1>♟️ {gameData.gameName}</h1>
        <div className="players">
          <div className={`player ${currentPlayer === 'w' ? 'active' : ''}`}>
            <span className="player-icon">♔</span>
            <span>{gameData.player1Name}</span>
          </div>
          <div className={`player ${currentPlayer === 'b' ? 'active' : ''}`}>
            <span className="player-icon">♚</span>
            <span>{gameData.player2Name}</span>
          </div>
        </div>
      </div>

      <div className="game-content">
        <div className="board-container">
          <div className="current-turn">
            {!isGameOver && (
              <p>Current turn: <strong>{getCurrentPlayerName()}</strong> ({currentPlayer === 'w' ? 'White' : 'Black'})</p>
            )}
            {gameStatus && <p className="game-status">{gameStatus}</p>}
          </div>
          
          <div className="chessboard">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="board-row">
                {row.map((square, colIndex) => {
                  const isLight = (rowIndex + colIndex) % 2 === 0;
                  const isSelected = isSquareSelected(rowIndex, colIndex);
                  const isPossible = isSquarePossibleMove(rowIndex, colIndex);
                  
                  return (
                    <div
                      key={colIndex}
                      className={`square ${isLight ? 'light' : 'dark'} ${isSelected ? 'selected' : ''} ${isPossible ? 'possible-move' : ''}`}
                      onClick={() => handleSquareClick(rowIndex, colIndex)}
                    >
                      {square && (
                        <span className={`piece ${square.color === 'w' ? 'white' : 'black'}`}>
                          {getPieceSymbol(square)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="game-sidebar">
          <div className="game-controls">
            <button className="btn btn-primary" onClick={handleNewGame}>
              New Game
            </button>
            <button className="btn" onClick={onBack}>
              Back to Menu
            </button>
          </div>

          {moveHistory.length > 0 && (
            <div className="move-history">
              <h3>Move History</h3>
              <div className="moves-list">
                {moveHistory.map((move, index) => (
                  <div key={index} className="move-item">
                    <span className="move-number">{Math.floor(index / 2) + 1}.</span>
                    <span className="move-notation">{move}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChessGame;
