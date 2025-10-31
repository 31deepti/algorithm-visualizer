import { buildPath, getNeighbors, toKey } from '../../utils/gridHelpers'

function dfs(grid, start, end) {
  const startKey = toKey(start.row, start.col)
  const endKey = toKey(end.row, end.col)
  const stack = [startKey]
  const visited = new Set([startKey])
  const previous = new Map()
  const steps = []

  const pushStep = (current = null, path = []) => {
    steps.push({
      visited: Array.from(visited),
      frontier: stack.slice(),
      current,
      path,
    })
  }

  pushStep()

  while (stack.length > 0) {
    const currentKey = stack.pop()
    const [row, col] = currentKey.split('-').map(Number)
    pushStep(currentKey)

    if (currentKey === endKey) {
      const path = buildPath(previous, startKey, endKey)
      pushStep(currentKey, path)
      return steps
    }

    const neighbors = getNeighbors(grid, row, col).reverse()
    for (const neighbor of neighbors) {
      const key = toKey(neighbor.row, neighbor.col)
      if (neighbor.isWall || visited.has(key)) continue
      visited.add(key)
      previous.set(key, currentKey)
      stack.push(key)
      pushStep(currentKey)
    }
  }

  pushStep()
  return steps
}

export default dfs
