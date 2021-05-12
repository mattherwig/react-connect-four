import { Button } from "react-bootstrap";

import "./BoardHistory.css";

export default function BoardHistory({ history, onSetGame }) {
  const historyElements = history.map(({ turn, winner }, index) => (
    // Note: While an index should not be used in theory, the index shouldn't change on each history element in this case
    <HistoryItem
      key={index}
      index={index}
      turn={turn}
      winnerPlayer={winner?.player}
      onSetGame={() => onSetGame(index)}
    />
  ));
  return (
    <div className="board-history">
      {historyElements.reverse()}
    </div>
  );
}

const HistoryItem = ({ index, turn, winnerPlayer, onSetGame }) => {
  return (
    <Button className="board-history__item" variant="dark" onClick={() => onSetGame(index)}>
      { winnerPlayer ? `${winnerPlayer} won in ${turn} turns` : `Lasted ${turn} turns`}
    </Button>
  );
}
