import React from 'react';
import Square from './Square';

export default function Board({ squares, wonLine, selectedItem, onClick }) {
  const width = Math.sqrt(squares.length);

  const renderSquare = (i) => {
    const isWon = wonLine.includes(i);
    const isSelected = selectedItem === i;
    return (
      <Square
        value={squares[i]}
        selected={isSelected}
        won={isWon}
        onClick={() => onClick(i)}
        key={i}
      />
    );
  };

  return (
    <div>
      {[...Array(width).keys()].map((row) => {
        return (
          <div className="board-row" key={row}>
            {[...Array(width).keys()].map((col) => {
              return renderSquare(row * width + col);
            })}
          </div>
        );
      })}
    </div>
  );
}
