import { useState } from 'react'
import { usePlayerMovement } from './hooks/usePlayerMovement'
import { useEnemyMovement } from './hooks/useEnemyMovement'
import { useCollisions } from './hooks/useCollisions'
import { useDifficultyIncrease } from './hooks/useDifficultyIncrease'
import Intro from './components/Intro/Intro'
import GameBoard from './components/GameBoard/GameBoard'
import HUD from './components/HUD/HUD'
import Restart from './components/Restart/Restart'
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
  const [gridSize, setGridSize] = useState(10)
  const [opacity, setOpacity] = useState('1')

  // Player movement
  usePlayerMovement(status, gridSize, setPlayer)

  // Enemy movement loop
  useEnemyMovement(status, gridSize, setEnemies)

  // Collision detection
  useCollisions({ player, enemies, signals, setSignals, setStatus, setScore, setOpacity })

  // Difficulty increase
  useDifficultyIncrease({ status, player, enemies, gridSize, setEnemies, setSignals, setPlayer, setStatus, setGridSize })

  return (
    <div className="app">
      <Intro></Intro>
      <HUD score={score} status={status} />
      <GameBoard player={player} enemies={enemies} signals={signals} opacity={opacity} gridSize={gridSize} status={status} />
      <Restart />
    </div>
  )
}

export default App
