const calculateWinner = (squares) => {
  const nMax = 5;
  const n = Math.sqrt(squares.length);

  const getWinLineByRow = (row) => {
    let winLine = [];
    for (let i = 0; i <= n - nMax; i++) {
      if (
        squares[row * n + i] &&
        squares[row * n + i] === squares[row * n + i + 1] &&
        squares[row * n + i] === squares[row * n + i + 2] &&
        squares[row * n + i] === squares[row * n + i + 3] &&
        squares[row * n + i] === squares[row * n + i + 4]
      ) {
        for (let j = 0; j < nMax; j++) {
          winLine.push(n * row + i + j);
        }
        break;
      }
    }
    return winLine;
  };

  for (let row = 0; row < n; row++) {
    const winLine = getWinLineByRow(row);
    if (winLine.length > 0) {
      return { name: squares[winLine[0]], line: winLine };
    }
  }

  const getWinLineByCol = (col) => {
    let winLine = [];
    for (let i = 0; i <= n - nMax; i++) {
      if (
        squares[i * n + col] &&
        squares[i * n + col] === squares[(i + 1) * n + col] &&
        squares[i * n + col] === squares[(i + 2) * n + col] &&
        squares[i * n + col] === squares[(i + 3) * n + col] &&
        squares[i * n + col] === squares[(i + 4) * n + col]
      ) {
        for (let j = 0; j < nMax; j++) {
          winLine.push((i + j) * n + col);
        }
        break;
      }
    }
    return winLine;
  };

  for (let col = 0; col < n; col++) {
    const winLine = getWinLineByCol(col);
    if (winLine.length > 0) {
      return { name: squares[winLine[0]], line: winLine };
    }
  }

  const getWinLineByRightCross = (x, y) => {
    let winLine = [];
    for (let i = 0; i <= n - nMax; i++) {
      if (
        squares[x * n + y] &&
        squares[x * n + y] === squares[(x + 1) * n + y + 1] &&
        squares[x * n + y] === squares[(x + 2) * n + y + 2] &&
        squares[x * n + y] === squares[(x + 3) * n + y + 3] &&
        squares[x * n + y] === squares[(x + 4) * n + y + 4]
      ) {
        for (let j = 0; j < nMax; j++) {
          winLine.push((x + j) * n + y + j);
        }
        break;
      }
    }
    return winLine;
  };

  for (let row = 0; row <= n - nMax; row++) {
    for (let col = 0; col <= n - nMax; col++) {
      const winLine = getWinLineByRightCross(row, col);
      if (winLine.length > 0) {
        return { name: squares[winLine[0]], line: winLine };
      }
    }
  }

  const getWinLineByLeftCross = (x, y) => {
    let winLine = [];
    for (let i = 0; i <= n - nMax; i++) {
      if (
        squares[x * n + y] &&
        squares[x * n + y] === squares[(x + 1) * n + y - 1] &&
        squares[x * n + y] === squares[(x + 2) * n + y - 2] &&
        squares[x * n + y] === squares[(x + 3) * n + y - 3] &&
        squares[x * n + y] === squares[(x + 4) * n + y - 4]
      ) {
        for (let j = 0; j < nMax; j++) {
          winLine.push((x + j) * n + y - j);
        }
        break;
      }
    }
    return winLine;
  };

  for (let row = 0; row <= n - nMax; row++) {
    for (let col = n - 1; col >= nMax - 1; col--) {
      const winLine = getWinLineByLeftCross(row, col);
      if (winLine.length > 0) {
        return { name: squares[winLine[0]], line: winLine };
      }
    }
  }
  return null;
};

export { calculateWinner };
