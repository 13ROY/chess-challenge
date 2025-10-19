import './GameControls.css';

function GameControls({ onNewGame, onBack }) {
  return (
    <div className="game-controls">
      <button className="btn btn-primary" onClick={onNewGame}>
        New Game
      </button>
      <button className="btn" onClick={onBack}>
        Back to Menu
      </button>
    </div>
  );
}

export default GameControls;
