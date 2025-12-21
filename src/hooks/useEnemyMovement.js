import { useEffect } from 'react'
import { clamp } from '../utils/gameLogic'

export function useEnemyMovement(status, setEnemies) {
  useEffect(() => {
    if (status !== 'Playing') return

    const interval = setInterval(() => {
      setEnemies(prev =>
        prev.map(enemy => ({
          x: clamp(enemy.x + (Math.random() > 0.5 ? 1 : -1)),
          y: clamp(enemy.y + (Math.random() > 0.5 ? 1 : -1))
        }))
      )
    }, 700)

    return () => clearInterval(interval)
  }, [status, setEnemies])
}