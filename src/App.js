import { useState } from 'react';
import Board from './components/Board';
import { SQUARES_LENGTH } from './constants';
import { calculateWinner } from './helpers';

function App() {
  const [history, setHistory] = useState([
    { selectedItem: undefined, squares: Array(SQUARES_LENGTH ** 2).fill(null) },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isDescSort, setIsDescSort] = useState(false);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[stepNumber];

    if (current.squares[i] || calculateWinner(current.squares)) return;

    const squares = current.squares.slice();
    squares[i] = xIsNext ? 'X' : 'O';
    newHistory.push({ selectedItem: i, squares });

    setHistory(newHistory);
    setStepNumber(newHistory.length - 1);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const toggleSort = () => {
    setIsDescSort(!isDescSort);
  };

  const moves = history.map((step, index) => {
    let move = index;
    if (isDescSort) {
      move = history.length - index - 1;
    }
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button
          className={stepNumber === move && 'move-list selected'}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });
  const current = history[stepNumber];
  const squares = current.squares;
  let status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  let wonLine = [];
  const winner = calculateWinner(squares);

  if (stepNumber === SQUARES_LENGTH ** 2) {
    status = 'You drawed!!!';
  }
  if (winner) {
    status = 'Winner: ' + winner.name;
    wonLine = winner.line;
    console.log(wonLine);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          selectedItem={current.selectedItem}
          wonLine={wonLine}
          onClick={handleClick}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={toggleSort}>
          {isDescSort ? 'To sort by asc' : 'To sort by desc'}
        </button>
        <ol reversed={isDescSort}>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
