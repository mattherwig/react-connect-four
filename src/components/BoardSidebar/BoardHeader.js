import { Button, ProgressBar } from "react-bootstrap";
import { MAX_TURNS, PLAYER_RED_TILE, PLAYER_YELLOW_TILE } from "../../utils/ApplicationConstants";

import './BoardHeader.css';

export default function BoardHeader({ turn, winner, onReset }) {
  return (
    <div className="board-header">
      <HeaderInfo
        title={winner ? 'Winner:' : 'Turn:'}
        highlight={turn % 2 === 0 ? PLAYER_RED_TILE : PLAYER_YELLOW_TILE }
      />
      <HeaderActionGroup
        onReset={onReset}
      />
      <ProgressBar
          animated
          variant={winner ? "danger" : "warning"}
          min={0}
          max={MAX_TURNS}
          now={winner ? MAX_TURNS : turn}
        />
    </div>
  );
}

function HeaderInfo({ title, highlight }) {
  return (
    <>
      <h4 className="board-header__title">{title}</h4>
      <h1 className="board-header__highlight">{highlight}</h1>
    </>
  )
}

function HeaderActionGroup({ onReset }) {
  return (
    <Button
      className="board-header__reset"
      variant="dark"
      onClick={onReset}
    >
      Reset
    </Button>
  );
}