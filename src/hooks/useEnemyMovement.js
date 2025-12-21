import { useEffect } from 'react'
import { clamp } from '../utils/gameLogic'

export function useEnemyMovement(status, gridSize, setEnemies) {
  useEffect(() => {
    if (status !== 'Playing') return

    const interval = setInterval(() => {
      setEnemies(prev =>
        prev.map(enemy => ({
          x: clamp(enemy.x + (Math.random() > 0.5 ? 1 : -1), gridSize),
          y: clamp(enemy.y + (Math.random() > 0.5 ? 1 : -1), gridSize)
        }))
      )
    }, 700)

    return () => clearInterval(interval)
  }, [status, setEnemies])
}