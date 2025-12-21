import { useEffect } from 'react'
import { isSamePosition, setGapSize, setOpacity } from '../utils/gameLogic'

export function useCollisions({player, enemies, signals, setSignals, setStatus, setScore}) {
  useEffect(() => {
    if (enemies.some(e => isSamePosition(e, player))) {
      setStatus('Game Over')
      setGapSize('40')
      setOpacity('0.2')
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