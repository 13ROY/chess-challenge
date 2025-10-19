import './MoveHistory.css';

function MoveHistory({ moveHistory }) {
  if (moveHistory.length === 0) return null;

  return (
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
  );
}

export default MoveHistory;
