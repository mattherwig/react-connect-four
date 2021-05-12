import { Button, ProgressBar } from "react-bootstrap";
import { MAX_TURNS } from "../../utils/ApplicationConstants";

import './BoardHeader.css';

export default function BoardHeader({ turn, player, winner, onReset }) {
  return (
    <div className="board-header">
      <HeaderInfo
        title={winner?.player ? 'Winner:' : 'Turn:'}
        highlight={player}
      />
      <HeaderActionGroup
        onReset={onReset}
      />
      <ProgressBar
          animated
          variant={winner?.player ? "danger" : "warning"}
          min={0}
          max={MAX_TURNS}
          now={winner ? MAX_TURNS : turn}
        />
    </div>
  );
}

const HeaderInfo = ({ title, highlight }) => {
  return (
    <>
      <h4 className="board-header__title">{title}</h4>
      <h1 className="board-header__highlight">{highlight}</h1>
    </>
  )
}

const HeaderActionGroup = ({ onReset }) => {
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