import { useEffect, useState, useCallback } from 'react'
import { useKeyboard } from './hooks/useKeyboard'
import { clamp, isSamePosition, GRID_SIZE, setGridSize } from './utils/gameLogic'
import GameBoard from './components/GameBoard'
import HUD from './components/HUD'
import Restart from './components/Restart'
import './styles/main.scss'

function App() {
  const [player, setPlayer] = useState({ x: 0, y: 0 })
  const [enemies, setEnemies] = useState([
    { x: 5, y: 5 },
    { x: 8, y: 2 }
  ])
  const [signals, setSignals] = useState([
    { x: 2, y: 3 },
    { x: 7, y: 1 }
  ])
  const [status, setStatus] = useState('Playing')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0)

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

  // Enemy movement loop
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
  }, [status])

  // Collision detection
  useEffect(() => {
    if (enemies.some(e => isSamePosition(e, player))) {
      setStatus('Game Over')
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

  // Difficulty increase
  useEffect(() => {
    if (status !== 'You Win!') return

    const newSize = Math.max(6, GRID_SIZE - 1)

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
      return [...prev, enemy].map(e => ({ x: clamp(e.x), y: clamp(e.y) }))
    })

    // Respawn signals for next round (2 signals)
    setSignals(prev => {
      const existing = []
      const s1 = randomPos(existing.concat(player, ...enemies))
      existing.push(s1)
      const s2 = randomPos(existing.concat(player, ...enemies))
      return [s1, s2].map(s => ({ x: clamp(s.x), y: clamp(s.y) }))
    })

    // Clamp player and enemies to new grid bounds
    setPlayer(p => ({ x: clamp(p.x), y: clamp(p.y) }))
    setEnemies(prev => prev.map(e => ({ x: clamp(e.x), y: clamp(e.y) })))

    // Resume playing
    setStatus('Playing')
  }, [status])

  // High score tracker
  useEffect(() => {
    if (highScore === null || score > parseInt(highScore)) {
      localStorage.setItem('highScore', score)
      setHighScore(score)
    }
  }, [highScore, score])

  return (
    <div className="app">
      <h1>Grid Runner</h1>
      <HUD score={score} highScore={highScore} status={status} />
      <GameBoard player={player} enemies={enemies} signals={signals} />
      <Restart />
    </div>
  )
}

export default App
