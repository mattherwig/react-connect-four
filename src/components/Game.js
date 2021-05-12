import _ from "lodash";
import { useReducer } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { PLAYER_RED_TILE, PLAYER_YELLOW_TILE } from "../utils/ApplicationConstants";
import checkWinner from "../utils/WinnerCalculator";
import Board from "./Board/Board";
import BoardSidebar from "./BoardSidebar/BoardSidebar";

import "./Game.css";

const initialState = {
  current: {
    turn: 0,
    tileMatrix: Array(6).fill([]).map(() => Array(7).fill(null)),
    winner: {},
    player: function() { return this.turn % 2 === 0 ? PLAYER_RED_TILE : PLAYER_YELLOW_TILE; },
  },
  history: []
};

const actionTypes = Object.freeze({
  SET_TILE: "SET_TILE",
  RESET: "RESET",
  SET_GAME: "SET_GAME",
});

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_TILE:
      const currentTileMatrix = _.cloneDeep(state.current.tileMatrix),
            highestRow = _.findLastIndex(currentTileMatrix, tileRow => !tileRow[action.column]);
      
      if (highestRow === -1) return state;
      currentTileMatrix[highestRow][action.column] = state.current.player();
      
      const current = {
        ...state.current,
        turn: state.current.turn + 1,
        tileMatrix: currentTileMatrix,
        winner: checkWinner(currentTileMatrix)
      };
      return { ...state, current };
    case actionTypes.RESET:
      return { ...initialState, history: _.concat(_.cloneDeep(state.history), _.cloneDeep(state.current)) };
    case actionTypes.SET_GAME:
      return { ...state, current: state.history[action.index] };
    default:
      return state;
  }
}

export default function Game() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Container>
      <Row>
        <Col>
          <Board 
            current={state.current}
            onPlayAgain={() => dispatch({ type: actionTypes.RESET })}
            onTileClick={(column) => dispatch({ type: actionTypes.SET_TILE, column: column })}
          />
        </Col>
        <Col xs={12} lg>
          <BoardSidebar 
            current={state.current}
            history={state.history}
            onReset={() => dispatch({ type: actionTypes.RESET })}
            onSetGame={(index) => dispatch({ type: actionTypes.SET_GAME, index: index })}
          />
        </Col>
      </Row>
    </Container>
  );
}
