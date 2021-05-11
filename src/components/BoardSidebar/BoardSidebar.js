import BoardHeader from './BoardHeader';
import BoardHistory from './BoardHistory';

import './BoardSidebar.css';

export default function BoardSidebar({ turn, winner, tileMatrixHistory, onReset, onSetGame }) {
  return (
    <div className="board-sidebar">
      <div className="board-sidebar__progress">
        <BoardHeader 
          turn={turn} 
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