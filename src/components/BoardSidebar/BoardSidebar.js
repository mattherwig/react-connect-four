import BoardHeader from './BoardHeader';
import BoardHistory from './BoardHistory';

import './BoardSidebar.css';

export default function BoardSidebar({ step, winner, tileMatrixHistory, onReset, onSetGame }) {
  return (
    <div className="board-sidebar">
      <div className="board-sidebar__progress">
        <BoardHeader 
          step={step} 
          winner={winner}
          onReset={onReset}
        />
        <BoardHistory
          tileMatrixHistory={tileMatrixHistory}
          onSetGame={onSetGame}
        />
      </div>
    </div>
  )
}