import Cell from '../Cell/Cell'
import { GRID_SIZE, GAP_SIZE, OPACITY, isSamePosition } from '../../utils/gameLogic'
import './GameBoard.scss'

export default function GameBoard({ player, enemies, signals }) {
  const cells = [];
  const style = {
    '--grid-size': String(GRID_SIZE),
    '--gap-size': String(GAP_SIZE),
    '--opacity': String(OPACITY)
  };

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
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

  return (
    <div className="board" style={style}>{cells}</div>
  )
}