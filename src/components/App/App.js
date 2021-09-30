import { useState } from 'react';
import Board from '../Board';
import { MAX_WIDTH, MIN_WIDTH } from '../../common/constants';
import { calculateWinner } from '../../common/helpers';

function App() {
  const localBoardWidth = localStorage.getItem('boardWidth')
    ? localStorage.getItem('boardWidth')
    : MIN_WIDTH;
  const [boardWidth, setBoardWidth] = useState(localBoardWidth);
  const [history, setHistory] = useState([
    {
      selectedPos: undefined,
      squares: Array(localBoardWidth ** 2).fill(null),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isDescSort, setIsDescSort] = useState(false);

  const initGame = (width) => {
    setHistory([
      { selectedPos: undefined, squares: Array(width ** 2).fill(null) },
    ]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const onChangeBoardWidth = () => {
    if (!(boardWidth >= MIN_WIDTH && boardWidth <= MAX_WIDTH)) {
      alert(`Value must be in range ${MIN_WIDTH} to ${MAX_WIDTH}`);
      return;
    }
    initGame(boardWidth);
    localStorage.setItem('boardWidth', boardWidth);
  };

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[stepNumber];

    if (current.squares[i] || calculateWinner(current.squares)) return;

    const squares = current.squares.slice();
    squares[i] = xIsNext ? 'X' : 'O';
    newHistory.push({ selectedPos: i, squares });

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

  const handleEnterBoardWidthInput = (event) => {
    if (event.key === 'Enter') {
      onChangeBoardWidth();
    }
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
          className={stepNumber === move ? 'selected' : ''}
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

  if (stepNumber === history[0].squares.length) {
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
        <div className="status">{status}</div>

        <Board
          squares={squares}
          selectedItem={current.selectedPos}
          wonLine={wonLine}
          onClick={handleClick}
        />
      </div>
      <div className="game-info">
        <div>
          <input
            value={boardWidth}
            type="number"
            min={MIN_WIDTH}
            max={MAX_WIDTH}
            onChange={(e) => setBoardWidth(parseInt(e.target.value))}
            onKeyPress={handleEnterBoardWidthInput}
          ></input>
          <button onClick={onChangeBoardWidth}>
            <b>START NEW GAME</b>
          </button>
        </div>
        <div className="sort">
          <button onClick={toggleSort}>
            {isDescSort ? 'Show history by DESC' : 'Show history by ASC'}
          </button>
        </div>
        <div className="move-list">
          <ul reversed={isDescSort}>{moves}</ul>
        </div>
      </div>
    </div>
  );
}

export default App;
