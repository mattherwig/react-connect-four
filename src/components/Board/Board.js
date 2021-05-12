import Tile from "./Tile";
import { Button } from "react-bootstrap";
import { MAX_TURNS } from "../../utils/ApplicationConstants";

import "./Board.css";

export default function Board({ current, onPlayAgain, onTileClick }) {
  const isGameOver = !!current?.winner?.tiles,
        isGameTie = !isGameOver && current.turn >= MAX_TURNS;

  const tileElements = current.tileMatrix.map((tileRow, row) => {
    const tileRowElements = tileRow.map((tile, column) => {
      const winner = current.winner.tiles?.find(([r, c]) => r === row && c === column);
      return (
        <td key={column}>
          <Tile 
            value={tile}
            isWinner={!!winner}
            isGameOver={isGameOver}
            onClick={() => onTileClick(column)}
          />
        </td>
      );
    })
    return <tr key={row}>{tileRowElements}</tr>;
  });

  return (
    <div className="board">
      {isGameOver && <GameOverModal title="Game Over" subtitle={`${current.winner.player} won the game!`} onPlayAgain={onPlayAgain} />}
      {isGameTie && <GameOverModal title="Game Tie" onPlayAgain={onPlayAgain} />}
      <table>
        <tbody>{tileElements}</tbody>
      </table>
    </div>
  );
}

const GameOverModal = ({ title, subtitle, onPlayAgain }) => {
  return (
    <div className="board--gameover">
      <h2><b>{title}</b></h2>
      {subtitle && <h6>{subtitle}</h6>}
      <br/>
      <Button variant="dark" onClick={onPlayAgain}>Play Again</Button>
    </div>
  );
}
