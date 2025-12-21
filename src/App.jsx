import { useState } from 'react'
import { usePlayerMovement } from './hooks/usePlayerMovement'
import { useEnemyMovement } from './hooks/useEnemyMovement'
import { useCollisions } from './hooks/useCollisions'
import { useDifficultyIncrease } from './hooks/useDifficultyIncrease'
import GameBoard from './components/GameBoard/GameBoard'
import HUD from './components/HUD/HUD'
import Restart from './components/Restart/Restart'
import User from './components/User/User'
import HighScore from './components/HighScore/HighScore'
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

  // Player movement
  usePlayerMovement(status, setPlayer)

  // Enemy movement loop
  useEnemyMovement(status, setEnemies)

  // Collision detection
  useCollisions({player, enemies, signals, setSignals, setStatus, setScore})

  // Difficulty increase
  useDifficultyIncrease(status, player, enemies, setEnemies, setSignals, setPlayer, setStatus)

  return (
    <div className="app">
      <h1>Grid Runner</h1>
      <HUD score={score} status={status} />
      <GameBoard player={player} enemies={enemies} signals={signals} />
      <div className="user-info">
        <User name="Gridzilla" />
        <HighScore score={score} />
      </div>
      <Restart />
    </div>
  )
}

export default App
