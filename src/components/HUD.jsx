export default function HUD({ score, highScore, status }) {
  return (
    <div className="hud">
      <span><i>Score</i>: {score}</span>
      <span><i>High Score</i>: {highScore}</span>
      <span><i>Status</i>: {status}</span>
    </div>
  )
}