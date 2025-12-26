import { useEffect } from 'react'
import { isSamePosition } from '../utils/gameLogic'

export function useCollisions({player, enemies, signals, setSignals, setStatus, setScore, setOpacity}) {
  useEffect(() => {
    if (enemies.some(e => isSamePosition(e, player))) {
      setStatus('Game Over')
      setOpacity('0.3')
    }

    const collected = signals.find(s => isSamePosition(s, player))
    if (collected) {
      setSignals(prev => prev.filter(s => !isSamePosition(s, collected)))
      setScore(prev => prev + 1)
    }

    if (signals.length === 0) {
      setStatus('You Win!')
    }
  }, [player, enemies, signals])
}