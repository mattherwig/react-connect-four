import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Board from "./Board/Board";
import BoardSidebar from "./BoardSidebar/BoardSidebar";

import "./Game.css";

export const ROW_SIZE = 6;
export const COLUMN_SIZE = 7;
export const MAX_STEPS = ROW_SIZE * COLUMN_SIZE;
export const PLAYER_RED_TILE = 'red';
export const PLAYER_YELLOW_TILE = 'yellow';

export default function Game() {
  const [tileMatrix, setTileMatrix] = useState(getInitialTileMatrix());
  const [step, setStep] = useState(0);
  const [tileMatrixHistory, setTileMatrixHistory] = useState([]);

  const winnerTiles = checkWinner(tileMatrix);
  const winner = winnerTiles ? tileMatrix[winnerTiles[0][0]][winnerTiles[0][1]] : null;
  const currentPlayer = step % 2 === 0 ? PLAYER_RED_TILE : PLAYER_YELLOW_TILE;
  const onTileClick = (c) => {
    setTileMatrix(prevTileMatrix => {
      if (winnerTiles || step >= MAX_STEPS) return prevTileMatrix;

      const cloneTileMatrix = JSON.parse(JSON.stringify(prevTileMatrix));
      
      let r = -1;
      for (let i = ROW_SIZE - 1; i >= 0; i--) {
        if (cloneTileMatrix[i][c]) continue;
        r = i;
        break;
      }
      if (r === -1) return prevTileMatrix;

      cloneTileMatrix[r][c] = currentPlayer;
      setStep(step + 1);
      return cloneTileMatrix;
    });
  };

  const onReset = () => {
    setTileMatrixHistory(prevTileMatrixHistory => {
      const historyItem = {
        tileMatrix: JSON.parse(JSON.stringify(tileMatrix)),
        step: step,
        winner: winner
      };
      setTileMatrix(getInitialTileMatrix());
      setStep(0);
      return prevTileMatrixHistory.concat([historyItem]);
    });
  }

  const onSetGame = (index) => {
    const { tileMatrix: oldTileMatrix, step: oldStep } = tileMatrixHistory[index];
    setTileMatrix(JSON.parse(JSON.stringify(oldTileMatrix)));
    setStep(oldStep);
  }

  return (
    <Container>
      <Row noGutters>
        <Col>
          <Board 
            tileMatrix={tileMatrix} 
            winnerTiles={winnerTiles}
            winner={winner}
            step={step}
            currentPlayer={currentPlayer}
            onPlayAgain={onReset}
            onTileClick={onTileClick}
          />
        </Col>
        <Col>
          <BoardSidebar 
            step={step}
            winner={winner}
            tileMatrixHistory={tileMatrixHistory}
            onReset={onReset}
            onSetGame={onSetGame}
          />
        </Col>
      </Row>
    </Container>
  );
}

function checkWinner(tileMatrix) {
  for (let r = 0; r < ROW_SIZE - 3; r++) {
    for (let c = 0; c < COLUMN_SIZE; c++) {
      const head = tileMatrix[r][c];
      let count = 1;
      for (let rd = 1; rd < 4; rd++) {
        const curr = tileMatrix[r + rd][c];
        if (head && head === curr) count++;
      }
      if (count === 4) return [[r, c], [r + 1, c], [r + 2, c], [r + 3, c]];
    }
  }

  for (let c = 0; c < COLUMN_SIZE - 3; c++) {
    for (let r = 0; r < ROW_SIZE; r++) {
      const head = tileMatrix[r][c];
      let count = 1;
      for (let cd = 1; cd < 4; cd++) {
        const curr = tileMatrix[r][c + cd];
        if (head && head === curr) count++;
      }
      if (count === 4) return [[r, c], [r, c + 1], [r, c + 2], [r, c + 3]];
    }
  }

  for (let r = 0; r < ROW_SIZE - 3; r++) {
    for (let c = 0; c < COLUMN_SIZE - 3; c++) {
      const head = tileMatrix[r][c];
      let count = 1;
      for (let d = 1; d < 4; d++) {
        const curr = tileMatrix[r + d][c + d];
        if (head && head === curr) count++;
      }
      if (count === 4) return [[r, c], [r + 1, c + 1], [r + 2, c + 2], [r + 3, c + 3]];
    }
  }

  for (let r = 0; r < ROW_SIZE - 3; r++) {
    for (let c = 3; c < COLUMN_SIZE; c++) {
      const head = tileMatrix[r][c];
      let count = 1;
      for (let d = 1; d < 4; d++) {
        const curr = tileMatrix[r + d][c - d];
        if (head && head === curr) count++;
      }
      if (count === 4) return [[r, c], [r + 1, c - 1], [r + 2, c - 2], [r + 3, c - 3]];
    }
  }
  return null;
}

function getInitialTileMatrix() {
  return Array(ROW_SIZE).fill(Array(COLUMN_SIZE).fill(null));
}