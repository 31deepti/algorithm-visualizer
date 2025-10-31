import { buildPath, getNeighbors, toKey } from '../../utils/gridHelpers'

function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
}

function aStar(grid, start, end) {
  const startKey = toKey(start.row, start.col)
  const endKey = toKey(end.row, end.col)
  const open = [{ key: startKey, g: 0, f: heuristic(start, end) }]
  const visited = new Set()
  const frontier = new Set([startKey])
  const gScore = new Map([[startKey, 0]])
  const previous = new Map()
  const steps = []

  const pushStep = (current = null, path = []) => {
    steps.push({
      visited: Array.from(visited),
      frontier: Array.from(frontier),
      current,
      path,
    })
  }

  pushStep()

  while (open.length > 0) {
    open.sort((a, b) => a.f - b.f)
    const current = open.shift()
    const currentKey = current.key

    if (visited.has(currentKey)) continue
    visited.add(currentKey)
    frontier.delete(currentKey)
    pushStep(currentKey)

    if (currentKey === endKey) {
      const path = buildPath(previous, startKey, endKey)
      pushStep(currentKey, path)
      return steps
    }

    const [row, col] = currentKey.split('-').map(Number)
    const neighbors = getNeighbors(grid, row, col)

    for (const neighbor of neighbors) {
      if (neighbor.isWall) continue
      const neighborKey = toKey(neighbor.row, neighbor.col)
      const tentativeG = (gScore.get(currentKey) ?? Infinity) + 1

      if (tentativeG < (gScore.get(neighborKey) ?? Infinity)) {
        previous.set(neighborKey, currentKey)
        gScore.set(neighborKey, tentativeG)
        const f = tentativeG + heuristic(neighbor, end)
        open.push({ key: neighborKey, g: tentativeG, f })
        if (!visited.has(neighborKey)) frontier.add(neighborKey)
        pushStep(currentKey)
      }
    }
  }

  pushStep()
  return steps
}

export default aStar
