import Tile from "./Tile";
import { Button } from "react-bootstrap";
import { MAX_TURNS } from "../../utils/ApplicationConstants";

import "./Board.css";


export default function Board({ tileMatrix, winnerTiles, winner, turn, onPlayAgain, onTileClick }) {
  const tileElements = tileMatrix.map((tileRow, row) => {
    const tileRowElements = tileRow.map((tile, column) => {
      const winner = winnerTiles?.find(([r, c]) => r === row && c === column);
      return (
        <td key={column}>
          <Tile 
            value={tile} 
            row={row}
            isWinner={!!winner}
            isGameOver={!!winnerTiles}
            onClick={() => onTileClick(column)}
          />
        </td>
      );
    })
    return <tr key={row}>{tileRowElements}</tr>;
  });

  return (
    <div className="board">
      {winnerTiles && <GameOverModal title="Game Over" subtitle={`${winner} won the game!`} onPlayAgain={onPlayAgain} />}
      {!winnerTiles && turn >= MAX_TURNS && <GameOverModal title="Game Tie" onPlayAgain={onPlayAgain} />}
      <table>
        <tbody>{tileElements}</tbody>
      </table>
    </div>
  );
}

function GameOverModal({ title, subtitle, onPlayAgain }) {
  return (
    <div className="board--gameover">
      <h2><b>{title}</b></h2>
      {subtitle && <h6>{subtitle}</h6>}
      <br/>
      <Button variant="dark" onClick={onPlayAgain}>Play Again</Button>
    </div>
  );
}