import { useState } from 'react';
import StartScreen from './components/StartScreen';
import ChessGame from './components/ChessGame';
import { saveGame, getGame } from './utils/storage';
import './App.css';

function App() {
  const [currentGame, setCurrentGame] = useState(null);

  const handleStartNewGame = (gameData) => {
    const newGameData = {
      ...gameData,
      fen: null, // Start with default position
      history: [],
    };
    saveGame(gameData.gameId, newGameData);
    setCurrentGame(newGameData);
  };

  const handleResumeGame = (gameId) => {
    const gameData = getGame(gameId);
    if (gameData) {
      setCurrentGame({ ...gameData, gameId });
    }
  };

  const handleSaveGame = (updates) => {
    if (currentGame) {
      const updatedGame = { ...currentGame, ...updates };
      saveGame(currentGame.gameId, updatedGame);
      setCurrentGame(updatedGame);
    }
  };

  const handleBackToMenu = () => {
    setCurrentGame(null);
  };

  return (
    <div className="app">
      {!currentGame ? (
        <StartScreen 
          onStartNewGame={handleStartNewGame}
          onResumeGame={handleResumeGame}
        />
      ) : (
        <ChessGame 
          gameData={currentGame}
          onSave={handleSaveGame}
          onBack={handleBackToMenu}
        />
      )}
    </div>
  );
}

export default App;
