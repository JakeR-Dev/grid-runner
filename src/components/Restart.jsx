export default function Restart() {
  return (
    <div className="restart">
      <button className="btn" onClick={() => window.location.reload()}>Restart</button>
    </div>
  )
}