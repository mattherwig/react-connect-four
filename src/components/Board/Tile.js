import Fade from '../../transitions/Fade';

import './Tile.css';

export default function Tile({ value, isWinner, isGameOver, onClick }) {
  return (
    <Fade
      duration={500}
      in={!isGameOver || isWinner}
    >
      <button
        className={`tile ${value ? `tile--${value}` : ""} ${isWinner ? "tile--winner" : ""}`}
        onClick={onClick}
      />
    </Fade>
  );
}