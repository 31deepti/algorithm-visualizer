export function toKey(row, col) {
  return `${row}-${col}`
}

export function fromKey(key) {
  const [row, col] = key.split('-').map(Number)
  return { row, col }
}

export function createNode(row, col, start, end) {
  return {
    row,
    col,
    isStart: row === start.row && col === start.col,
    isEnd: row === end.row && col === end.col,
    isWall: false,
  }
}

export function createGrid(rows, cols, start, end) {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => createNode(row, col, start, end)),
  )
}

export function cloneGrid(grid) {
  return grid.map((row) => row.map((node) => ({ ...node })))
}

export function getNeighbors(grid, row, col) {
  const candidates = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ]

  return candidates
    .filter(([r, c]) => r >= 0 && c >= 0 && r < grid.length && c < grid[0].length)
    .map(([r, c]) => grid[r][c])
}

export function buildPath(previousMap, startKey, endKey) {
  const path = []
  let cursor = endKey

  while (cursor) {
    path.unshift(cursor)
    if (cursor === startKey) break
    cursor = previousMap.get(cursor)
  }

  if (path[0] !== startKey) return []
  return path
}
