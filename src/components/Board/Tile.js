import { Transition } from 'react-transition-group';
import { PLAYER_RED_TILE } from '../Game';

import './Tile.css';

export default function Tile({ value, row, isWinner, isGameOver, onClick }) {
  const tileClassName = value ? (value === PLAYER_RED_TILE ? "tile--red" : "tile--yellow") : "";
  const winnerClassName = isWinner ? "tile--winner" : "";

  const duration = 500;
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0.5,
  }
  
  const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0.5 },
    exited:  { opacity: 0.5 },
  };

  return (
    <Transition
      in={!isGameOver || isWinner} 
      timeout={duration}
    >
      {state => (
        <div style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          <button
            className={`tile ${tileClassName} ${winnerClassName}`}
            onClick={onClick}
          />
        </div>
      )}
    </Transition>
  );
}