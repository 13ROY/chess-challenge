import './PlayerInfo.css';

function PlayerInfo({ player1Name, player2Name, currentPlayer }) {
  return (
    <div className="players">
      <div className={`player ${currentPlayer === 'w' ? 'active' : ''}`}>
        <span className="player-icon">♔</span>
        <span>{player1Name}</span>
      </div>
      <div className={`player ${currentPlayer === 'b' ? 'active' : ''}`}>
        <span className="player-icon">♚</span>
        <span>{player2Name}</span>
      </div>
    </div>
  );
}

export default PlayerInfo;
