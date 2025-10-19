import { useState } from 'react';
import './StartScreen.css';

function StartScreen({ onStartNewGame, onResumeGame }) {
  const [showNewGameForm, setShowNewGameForm] = useState(false);
  const [showJoinGameForm, setShowJoinGameForm] = useState(false);
  const [gameName, setGameName] = useState('');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [joinError, setJoinError] = useState('');
  const [savedGames, setSavedGames] = useState(() => {
    const games = JSON.parse(localStorage.getItem('chess-games') || '{}');
    return Object.entries(games).map(([id, game]) => ({ id, ...game }));
  });

  const handleStartNewGame = (e) => {
    e.preventDefault();
    if (!gameName || !player1Name || !player2Name) return;

    const gameId = Date.now().toString();
    onStartNewGame({
      gameId,
      gameName,
      player1Name,
      player2Name,
    });
  };

  const handleJoinGame = (e) => {
    e.preventDefault();
    if (!gameCode) return;

    const codeMap = JSON.parse(localStorage.getItem('chess-game-codes') || '{}');
    const gameId = codeMap[gameCode.toUpperCase()];
    
    if (gameId) {
      const games = JSON.parse(localStorage.getItem('chess-games') || '{}');
      const game = games[gameId];
      
      if (game) {
        setJoinError('');
        onResumeGame(gameId);
      } else {
        setJoinError('Game not found. Please check the code.');
      }
    } else {
      setJoinError('Invalid game code. Please check and try again.');
    }
  };

  const handleDeleteGame = (gameId) => {
    const games = JSON.parse(localStorage.getItem('chess-games') || '{}');
    const game = games[gameId];
    
    // Remove game code mapping
    if (game && game.gameCode) {
      const codeMap = JSON.parse(localStorage.getItem('chess-game-codes') || '{}');
      delete codeMap[game.gameCode];
      localStorage.setItem('chess-game-codes', JSON.stringify(codeMap));
    }
    
    delete games[gameId];
    localStorage.setItem('chess-games', JSON.stringify(games));
    setSavedGames(Object.entries(games).map(([id, game]) => ({ id, ...game })));
  };

  const resetForms = () => {
    setShowNewGameForm(false);
    setShowJoinGameForm(false);
    setJoinError('');
    setGameCode('');
  };

  return (
    <div className="start-screen">
      <h1>♟️ Chess Challenge</h1>
      
      {!showNewGameForm && !showJoinGameForm ? (
        <div className="menu">
          <button className="btn btn-primary" onClick={() => setShowNewGameForm(true)}>
            Start New Game
          </button>
          
          <button className="btn btn-secondary" onClick={() => setShowJoinGameForm(true)}>
            Join Game with Code
          </button>

          {savedGames.length > 0 && (
            <div className="saved-games">
              <h2>Saved Games</h2>
              <div className="games-list">
                {savedGames.map((game) => (
                  <div key={game.id} className="game-card">
                    <div className="game-info">
                      <h3>{game.gameName}</h3>
                      <p>{game.player1Name} vs {game.player2Name}</p>
                      {game.gameCode && (
                        <p className="game-code">
                          Code: <strong>{game.gameCode}</strong>
                        </p>
                      )}
                      <p className="last-updated">
                        Last played: {new Date(game.lastUpdated).toLocaleString()}
                      </p>
                    </div>
                    <div className="game-actions">
                      <button 
                        className="btn btn-small" 
                        onClick={() => onResumeGame(game.id)}
                      >
                        Resume
                      </button>
                      <button 
                        className="btn btn-small btn-danger" 
                        onClick={() => handleDeleteGame(game.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : showJoinGameForm ? (
        <div className="join-game-form">
          <h2>Join Game</h2>
          <p className="form-description">
            Enter the 6-character game code shared by the other player
          </p>
          <form onSubmit={handleJoinGame}>
            <div className="form-group">
              <label htmlFor="gameCode">Game Code:</label>
              <input
                id="gameCode"
                type="text"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                placeholder="Enter 6-character code"
                maxLength={6}
                required
                className="code-input"
              />
              {joinError && <p className="error-message">{joinError}</p>}
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Join Game
              </button>
              <button 
                type="button" 
                className="btn" 
                onClick={resetForms}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="new-game-form">
          <h2>New Game</h2>
          <form onSubmit={handleStartNewGame}>
            <div className="form-group">
              <label htmlFor="gameName">Game Name:</label>
              <input
                id="gameName"
                type="text"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                placeholder="Enter game name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="player1Name">Player 1 (White):</label>
              <input
                id="player1Name"
                type="text"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                placeholder="Enter player 1 name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="player2Name">Player 2 (Black):</label>
              <input
                id="player2Name"
                type="text"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                placeholder="Enter player 2 name"
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Start Game
              </button>
              <button 
                type="button" 
                className="btn" 
                onClick={resetForms}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default StartScreen;
