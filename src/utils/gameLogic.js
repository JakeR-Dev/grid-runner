export let GRID_SIZE = 10

export function setGridSize(n) {
  GRID_SIZE = Math.max(6, Math.floor(n))
}

export function isSamePosition(a, b) {
  return a.x === b.x && a.y === b.y
}

export function clamp(value) {
  return Math.max(0, Math.min(GRID_SIZE - 1, value))
}
