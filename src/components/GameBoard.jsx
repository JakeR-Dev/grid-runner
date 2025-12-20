import Cell from './Cell'
import { GRID_SIZE, isSamePosition } from '../utils/gameLogic'

export default function GameBoard({ player, enemies, signals }) {
  const cells = []

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      let type = null

      if (isSamePosition(player, { x, y })) type = 'player'
      else if (enemies.some(e => isSamePosition(e, { x, y }))) type = 'enemy'
      else if (signals.some(s => isSamePosition(s, { x, y }))) type = 'signal'

      cells.push(<Cell key={`${x}-${y}`} type={type} />)
    }
  }

  const style = { '--grid-size': String(GRID_SIZE) }

  return <div className="board" style={style}>{cells}</div>
}