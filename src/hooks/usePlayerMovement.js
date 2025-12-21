import { useCallback } from 'react'
import { useKeyboard } from './useKeyboard'
import { clamp } from '../utils/gameLogic'

export function usePlayerMovement(status, setPlayer) {
  const movePlayer = (dx, dy) => {
    if (status !== 'Playing') return

    setPlayer(prev => ({
      x: clamp(prev.x + dx),
      y: clamp(prev.y + dy)
    }))
  }

  useKeyboard(
    useCallback(key => {
      if (key === 'ArrowUp') movePlayer(0, -1)
      if (key === 'ArrowDown') movePlayer(0, 1)
      if (key === 'ArrowLeft') movePlayer(-1, 0)
      if (key === 'ArrowRight') movePlayer(1, 0)
    }, [status])
  )
}