import { useState } from 'react';
import { MAX_WIDTH, MIN_WIDTH } from '../../common/constants';
import { calculateWinner } from '../../common/helpers';
import Board from '../Board';
import {
  GameInfo,
  GameStatus,
  MoveButton,
  MoveList,
  SortButton,
} from '../styles/StyledGameInfo';
import './App.css';

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
      alert(`Board width must be between ${MIN_WIDTH} to ${MAX_WIDTH}`);
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
    const n = Math.sqrt(history[0].squares.length);
    const pos = history[move].selectedPos;
    const desc = move
      ? `Go to move (${Math.floor(pos / n)},${pos % n})`
      : 'Go to game start';
    return (
      <li key={move}>
        <MoveButton selected={stepNumber === move} onClick={() => jumpTo(move)}>
          {desc}
        </MoveButton>
      </li>
    );
  });
  const current = history[stepNumber];
  const squares = current.squares;
  let status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  let wonLine = [];
  const winner = calculateWinner(squares);

  if (stepNumber === history[0].squares.length) {
    status = 'You draw!!!';
  }
  if (winner) {
    status = 'Winner: ' + winner.name;
    wonLine = winner.line;
    console.log(wonLine);
  }

  return (
    <div className="App-game">
      <div>
        <GameStatus
          won={winner ? true : false}
          draw={stepNumber === history[0].squares.length}
        >
          {status}
        </GameStatus>

        <Board
          squares={squares}
          selectedItem={current.selectedPos}
          wonLine={wonLine}
          onClick={handleClick}
        />
      </div>
      <GameInfo>
        <div>
          <input
            value={boardWidth}
            type="number"
            min={MIN_WIDTH}
            max={MAX_WIDTH}
            onChange={(e) => setBoardWidth(e.target.value)}
            onKeyPress={handleEnterBoardWidthInput}
          ></input>
          <button onClick={onChangeBoardWidth}>
            <b>START NEW GAME</b>
          </button>
        </div>
        <SortButton onClick={toggleSort}>
          {isDescSort ? 'Show history by DESC' : 'Show history by ASC'}
        </SortButton>
        <MoveList maxHeight={Math.sqrt(history[0].squares.length) * 39}>
          {moves}
        </MoveList>
      </GameInfo>
    </div>
  );
}

export default App;
