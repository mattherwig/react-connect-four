import BoardHeader from './BoardHeader';
import BoardHistory from './BoardHistory';

import './BoardSidebar.css';

export default function BoardSidebar({ current, history, onReset, onSetGame }) {
  return (
    <div className="board-sidebar">
      <div className="board-sidebar__progress">
        <BoardHeader 
          turn={current.turn}
          player={current.player()}
          winner={current.winner}
          onReset={onReset}
        />
        <BoardHistory
          history={history}
          onSetGame={onSetGame}
        />
      </div>
    </div>
  )
}