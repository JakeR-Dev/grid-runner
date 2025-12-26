import { useState, useEffect } from "react";
import './HUD.scss';

export default function HUD({ score, status, name: initialName }) {
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0);
  const [name, setName] = useState(() => {
    return localStorage.getItem('name') ?? initialName;
  });
  const [isEditing, setIsEditing] = useState(false);

  // reset high score
  function resetHighScore() {
    setHighScore(0);
    localStorage.setItem('highScore', 0);
  }

  // update high score
  useEffect(() => {
    if (score > parseInt(highScore)) {
      setHighScore(score)
      localStorage.setItem('highScore', score)
    }
  }, [score])

  // toggle name editing
  function changeNameClick() {
    setIsEditing((isEditing) => !isEditing);
  }

  // save name to localStorage
  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name])

  // player name and button caption
  let playerName = name;
  let btnCaption = "Edit";
  if (isEditing) {
    playerName = <input type="text" onChange={e => setName(e.target.value)} value={name} required />;
    btnCaption = "Save";
  }

  return (
    <div className="hud">
      <div className="score hud-item">
        <span><i>Score</i>: {score}</span>
      </div>
      <div className="status hud-item">
        <span><i>Status</i>: {status}</span>
      </div>
      <div className="high-score hud-item">
        <span><i>High Score</i>: {highScore}</span>
        <button className="inline" onClick={resetHighScore}>Reset</button>
      </div>
      <div className="user hud-item">
        <span><i>User: </i>{playerName}</span>
        <button className="inline" onClick={changeNameClick}>{btnCaption}</button>
      </div>
    </div>
  )
}