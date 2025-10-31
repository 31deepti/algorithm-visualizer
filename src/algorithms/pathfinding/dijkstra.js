import { buildPath, getNeighbors, toKey } from '../../utils/gridHelpers'

function dijkstra(grid, start, end) {
  const startKey = toKey(start.row, start.col)
  const endKey = toKey(end.row, end.col)
  const frontier = [{ key: startKey, distance: 0 }]
  const visited = new Set()
  const discovered = new Set([startKey])
  const distances = new Map([[startKey, 0]])
  const previous = new Map()
  const steps = []

  const pushStep = (current = null, path = []) => {
    steps.push({
      visited: Array.from(visited),
      frontier: Array.from(discovered),
      current,
      path,
    })
  }

  pushStep()

  while (frontier.length > 0) {
    frontier.sort((a, b) => a.distance - b.distance)
    const current = frontier.shift()
    const currentKey = current.key

    if (visited.has(currentKey)) continue
    visited.add(currentKey)
    discovered.delete(currentKey)

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
      const key = toKey(neighbor.row, neighbor.col)
      const nextDistance = (distances.get(currentKey) ?? Infinity) + 1

      if (nextDistance < (distances.get(key) ?? Infinity)) {
        distances.set(key, nextDistance)
        previous.set(key, currentKey)
        frontier.push({ key, distance: nextDistance })
        if (!visited.has(key)) discovered.add(key)
        pushStep(currentKey)
      }
    }
  }

  pushStep()
  return steps
}

export default dijkstra
