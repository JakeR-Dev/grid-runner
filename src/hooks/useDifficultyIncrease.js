import { useEffect } from 'react'
import { clamp, isSamePosition } from '../utils/gameLogic'

export function useDifficultyIncrease({status, player, enemies, gridSize, setEnemies, setSignals, setPlayer, setStatus, setGridSize}) {
  useEffect(() => {
    if (status !== 'You Win!') return

    const newSize = Math.max(6, gridSize - 1)
    function randomPos(existing = []) {
      let tries = 0
      while (tries < 100) {
        const x = Math.floor(Math.random() * newSize)
        const y = Math.floor(Math.random() * newSize)
        const pos = { x, y }
        const collides = existing.some(e => isSamePosition(e, pos))
        if (!collides) return pos
        tries += 1
      }
      return { x: 0, y: 0 }
    }

    // Shrink grid
    setGridSize(newSize)

    // Add one enemy
    setEnemies(prev => {
      const existing = [...prev]
      const enemy = randomPos(existing.concat(player))
      return [...prev, enemy].map(e => ({ x: clamp(e.x, gridSize), y: clamp(e.y, gridSize) }))
    })

    // Respawn signals for next round (2 signals)
    setSignals(prev => {
      const existing = []
      const s1 = randomPos(existing.concat(player, ...enemies))
      existing.push(s1)
      const s2 = randomPos(existing.concat(player, ...enemies))
      return [s1, s2].map(s => ({ x: clamp(s.x, gridSize), y: clamp(s.y, gridSize) }))
    })

    // Clamp player and enemies to new grid bounds
    setPlayer(p => ({ x: clamp(p.x, gridSize), y: clamp(p.y, gridSize) }))
    setEnemies(prev => prev.map(e => ({ x: clamp(e.x, gridSize), y: clamp(e.y, gridSize) })))

    // Resume playing
    setStatus('Playing')
  }, [status])
}