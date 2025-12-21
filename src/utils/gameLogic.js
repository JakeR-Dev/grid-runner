export function isSamePosition(a, b) {
  return a.x === b.x && a.y === b.y
}

export function clamp(value, gridSize) {
  return Math.max(0, Math.min(gridSize - 1, value))
}
