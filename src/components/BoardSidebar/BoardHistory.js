import { Button } from "react-bootstrap";

import "./BoardHistory.css";

export default function BoardHistory({ tileMatrixHistory, onSetGame }) {
  const historyElements = tileMatrixHistory.map(({ tileMatrix, turn, winner }, index) => (
    // Note: While an index should not be used in theory, the index shouldn't change on each history element in this case
    <HistoryItem
      key={index}
      index={index}
      turn={turn}
      winner={winner}
      onSetGame={() => onSetGame(index)}
    />
  ));
  return (
    <div className="board-history">
      {historyElements.reverse()}
    </div>
  );
}

function HistoryItem({ index, turn, winner, onSetGame }) {
  return (
    <Button className="board-history__item" variant="dark" onClick={() => onSetGame(index)}>
      { winner ? `${winner} won in ${turn} turns` : `Lasted ${turn} turns`}
    </Button>
  );
}
