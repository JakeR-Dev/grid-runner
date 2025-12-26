import Cell from '../Cell/Cell'
import { isSamePosition } from '../../utils/gameLogic'
import './GameBoard.scss'

export default function GameBoard({ player, enemies, signals, opacity, gridSize, status }) {
  const cells = [];
  const style = {
    '--grid-size': String(gridSize),
    '--opacity': opacity
  };
  let gameOverMessage = null;

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      let type = null

      if (isSamePosition(player, { x, y })) {
        type = 'player';
      } else if (enemies.some(e => isSamePosition(e, { x, y }))) {
        type = 'enemy';
      } else if (signals.some(s => isSamePosition(s, { x, y }))) {
        type = 'signal';
      }

      cells.push(<Cell key={`${x}-${y}`} type={type} />)
    }
  }

  if (status === 'Game Over') {
    gameOverMessage = <h2 className="game-over">Game Over</h2>;
  }

  return (
    <div className="board-wrapper">
      <div className="board" style={style}>{cells}</div>
      {gameOverMessage}
    </div>
  )
}