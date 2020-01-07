import {
  PLAYER_1_ID,
  PLAYER_2_ID,
  EMPTY_FIELD_ID,
  MAX_POSSIBLE_MOVES,
  WIN_COUNT
} from "../constants";

export const checkWinner = boardComposition => {
  let winner = null;
  winner = checkRowMatrix(boardComposition.board);
  if (winner === null) {
    winner = checkRowMatrix(transposeMatrix(boardComposition.board));
  }

  if (winner === null) {
    winner = checkRowMatrix(transMatrixToLRDiag(boardComposition.board));
  }

  if (winner === null) {
    winner = checkRowMatrix(transMatrixToRLDiag(boardComposition.board));
  }

  if (winner !== null) {
    return { ...boardComposition, winner: winner };
  }
  return checkDraw(boardComposition);
};

export const onSquareClick = (boardComposition, indexRow, indexCol) => {
  if (boardComposition.winner !== null) return boardComposition;
  let updateState = false;
  const newBoard = boardComposition.board.map((row, rowIndex) =>
    rowIndex === indexRow
      ? row.map((col, colIndex) => {
          if (colIndex === indexCol && col.occupiedBy === EMPTY_FIELD_ID) {
            updateState = true;
            return { occupiedBy: boardComposition.turnPlayerId };
          } else {
            return col;
          }
        })
      : row
  );
  if (!updateState) {
    return boardComposition;
  }
  const newState = {
    ...boardComposition,
    board: newBoard,
    turnPlayerId:
      boardComposition.turnPlayerId === PLAYER_1_ID ? PLAYER_2_ID : PLAYER_1_ID,
    turnCount: boardComposition.turnCount + 1
  };
  return checkWinner(newState);
};

export const checkDraw = boardComposition => {
  if (
    boardComposition.winner === null &&
    MAX_POSSIBLE_MOVES === boardComposition.turnCount
  ) {
    const newState = { ...boardComposition, winner: EMPTY_FIELD_ID };
    return newState;
  }
  return boardComposition;
};

const checkRowMatrix = board => {
  let winner = null;
  let currentWinCount = WIN_COUNT;
  let previousTile;
  for (let row of board) {
    currentWinCount = WIN_COUNT;
    previousTile = null;
    for (let tile of row) {
      if (previousTile !== null) {
        if (
          tile.occupiedBy !== EMPTY_FIELD_ID &&
          previousTile.occupiedBy === tile.occupiedBy
        ) {
          currentWinCount--;
          if (currentWinCount === 1) {
            return previousTile.occupiedBy;
          }
        } else {
          currentWinCount = WIN_COUNT;
        }
      }
      previousTile = tile;
    }
  }
  return winner;
};

const transposeMatrix = board => {
  let newMatrix = board[0].map((col, colIndex) =>
    board.map(row => row[colIndex])
  );
  return newMatrix;
};

const transMatrixToLRDiag = board => {
  let newMatrix = [[]];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (!newMatrix[i + j]) {
        newMatrix.push([]);
      }
      newMatrix[i + j].push(board[board.length - 1 - i][j]);
    }
  }
  return newMatrix;
};

const transMatrixToRLDiag = board => {
  let newMatrix = [[]];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (!newMatrix[i + j]) {
        newMatrix.push([]);
      }
      newMatrix[i + j].push(board[i][j]);
    }
  }
  return newMatrix;
};
