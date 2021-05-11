import { COLUMN_SIZE, ROW_SIZE } from "../utils/ApplicationConstants";

export default function checkWinner(tileMatrix) {
  return checkVerticalWinner(tileMatrix)
      || checkHorizontalWinner(tileMatrix)
      || checkDiagnolOneWinner(tileMatrix)
      || checkDiagnolTwoWinner(tileMatrix)
      || { winner: null, winnerTiles: null };
}

function checkVerticalWinner(tileMatrix) {
  for (let r = 0; r < ROW_SIZE - 3; r++) {
    for (let c = 0; c < COLUMN_SIZE; c++) {
      const head = tileMatrix[r][c];
      let count = 1;
      for (let rd = 1; rd < 4; rd++) {
        const curr = tileMatrix[r + rd][c];
        if (head && head === curr) count++;
      }
      if (count === 4) return {
        winner: head,
        winnerTiles: [[r, c], [r + 1, c], [r + 2, c], [r + 3, c]]
      };
    }
  }
  return null;
}

function checkHorizontalWinner(tileMatrix) {
  for (let c = 0; c < COLUMN_SIZE - 3; c++) {
    for (let r = 0; r < ROW_SIZE; r++) {
      const head = tileMatrix[r][c];
      let count = 1;
      for (let cd = 1; cd < 4; cd++) {
        const curr = tileMatrix[r][c + cd];
        if (head && head === curr) count++;
      }
      
      if (count === 4) return {
        winner: head,
        winnerTiles: [[r, c], [r, c + 1], [r, c + 2], [r, c + 3]]
      };
    }
  }
  return null;
}

function checkDiagnolOneWinner(tileMatrix) {
  for (let r = 0; r < ROW_SIZE - 3; r++) {
    for (let c = 0; c < COLUMN_SIZE - 3; c++) {
      const head = tileMatrix[r][c];
      let count = 1;
      for (let d = 1; d < 4; d++) {
        const curr = tileMatrix[r + d][c + d];
        if (head && head === curr) count++;
      }
      if (count === 4) return {
        winner: head,
        winnerTiles: [[r, c], [r + 1, c + 1], [r + 2, c + 2], [r + 3, c + 3]]
      };
    }
  }
  return null;
}

function checkDiagnolTwoWinner(tileMatrix) {
  for (let r = 0; r < ROW_SIZE - 3; r++) {
    for (let c = 3; c < COLUMN_SIZE; c++) {
      const head = tileMatrix[r][c];
      let count = 1;
      for (let d = 1; d < 4; d++) {
        const curr = tileMatrix[r + d][c - d];
        if (head && head === curr) count++;
      }
      if (count === 4) return {
        winner: head,
        winnerTiles: [[r, c], [r + 1, c - 1], [r + 2, c - 2], [r + 3, c - 3]]
      };
    }
  }
  return null;
}