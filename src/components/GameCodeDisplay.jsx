import './GameCodeDisplay.css';

function GameCodeDisplay({ gameCode }) {
  if (!gameCode) return null;

  return (
    <div className="game-code-display">
      <span className="code-label">Game Code:</span>
      <span className="code-value">{gameCode}</span>
      <span className="code-info">Share this code with other players</span>
    </div>
  );
}

export default GameCodeDisplay;
