import './ChessBoard.css';

function ChessBoard({ 
  board, 
  onSquareClick, 
  isSquareSelected, 
  isSquarePossibleMove,
  getPieceSymbol 
}) {
  return (
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
                onClick={() => onSquareClick(rowIndex, colIndex)}
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
  );
}

export default ChessBoard;
