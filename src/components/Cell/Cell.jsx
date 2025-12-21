import './Cell.scss';

export default function Cell({ type }) {
  return <div className={`cell ${type || ''}`} />
}