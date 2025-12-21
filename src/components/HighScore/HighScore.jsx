import { useState, useEffect } from "react";
import './HighScore.scss';

export default function HighScore({score}) {
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0);

  function resetHighScore() {
    setHighScore(0);
    localStorage.setItem('highScore', 0);
  }

  useEffect(() => {
    if (score > parseInt(highScore)) {
      setHighScore(score)
      localStorage.setItem('highScore', score)
    }
  }, [score])

  return (
    <div className="high-score">
      <span><i>High Score</i>: {highScore}</span>
      <button className="inline" onClick={resetHighScore}>Reset</button>
    </div>
  )
}