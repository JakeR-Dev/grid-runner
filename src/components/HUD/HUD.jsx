import './HUD.scss';

export default function HUD({ score, status }) {
  return (
    <div className="hud">
      <span><i>Score</i>: {score}</span>
      <span><i>Status</i>: {status}</span>
    </div>
  )
}