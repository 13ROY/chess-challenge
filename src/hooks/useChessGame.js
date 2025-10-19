import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';

/**
 * Custom hook for chess game logic
 * Follows Single Responsibility Principle - handles only chess game state and logic
 */
export function useChessGame(gameData, onSave) {
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
      const move = {
        from: selectedSquare,
        to: square,
        promotion: 'q',
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
          
          onSave({
            fen: chess.fen(),
            history: newHistory,
          });
        } else {
          selectSquare(square);
        }
      } catch {
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

  return {
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
  };
}
