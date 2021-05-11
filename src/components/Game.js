import _ from "lodash";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MAX_TURNS, PLAYER_RED_TILE, PLAYER_YELLOW_TILE } from "../utils/ApplicationConstants";
import checkWinner from "../utils/WinnerCalculator";
import Board from "./Board/Board";
import BoardSidebar from "./BoardSidebar/BoardSidebar";

import "./Game.css";

export default function Game() {
  const [tileMatrix, setTileMatrix] = useState(getInitialTileMatrix());
  const [turn, setTurn] = useState(0);
  const [tileMatrixHistory, setTileMatrixHistory] = useState([]);

  const { winner, winnerTiles } = checkWinner(tileMatrix);
  const currentPlayer = turn % 2 === 0 ? PLAYER_RED_TILE : PLAYER_YELLOW_TILE;

  const onTileClick = (column) => {
    if (winner || turn >= MAX_TURNS) return;
    const cloneTileMatrix = _.cloneDeep(tileMatrix);
    
    const highestRow = _.findLastIndex(cloneTileMatrix, tileRow => !tileRow[column]);
    if (highestRow === -1) return;

    cloneTileMatrix[highestRow][column] = currentPlayer;
    setTurn(turn + 1);
    setTileMatrix(cloneTileMatrix);
  };

  const onReset = () => {
    const historyItem = {
      tileMatrix: _.cloneDeep(tileMatrix),
      turn: turn,
      winner: winner
    };
    setTurn(0);
    setTileMatrix(getInitialTileMatrix());
    setTileMatrixHistory(_.cloneDeep(tileMatrixHistory).concat([historyItem]))
  }

  const onSetGame = (index) => {
    const { tileMatrix, turn } = tileMatrixHistory[index];
    setTurn(turn);
    setTileMatrix(_.cloneDeep(tileMatrix));
  }

  return (
    <Container>
      <Row>
        <Col>
          <Board 
            tileMatrix={tileMatrix} 
            winnerTiles={winnerTiles}
            winner={winner}
            turn={turn}
            currentPlayer={currentPlayer}
            onPlayAgain={onReset}
            onTileClick={onTileClick}
          />
        </Col>
        <Col xs={12} lg>
          <BoardSidebar 
            turn={turn}
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


function getInitialTileMatrix() {
  // Array(ROW_SIZE).fill(Array(COLUMN_SIZE).fill(null)) -- doesn't work
  const column = [null, null, null, null, null, null, null];
  return [[...column],[...column],[...column],[...column],[...column],[...column]];
}
