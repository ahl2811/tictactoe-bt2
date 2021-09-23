import React from 'react';
import { SQUARES_LENGTH } from '../constants';
import Square from './Square';

export default function Board({ squares, wonLine, selectedItem, onClick }) {
  const renderSquare = (i) => {
    const isWon = wonLine.includes(i);
    const isSelected = selectedItem === i;

    return (
      <Square
        value={squares[i]}
        selected={isSelected}
        won={isWon}
        onClick={() => onClick(i)}
      />
    );
  };

  return (
    <div>
      {[...Array(SQUARES_LENGTH).keys()].map((row) => {
        return (
          <div className="board-row">
            {[...Array(SQUARES_LENGTH).keys()].map((col) => {
              return renderSquare(row * SQUARES_LENGTH + col);
            })}
          </div>
        );
      })}
    </div>
  );
}
