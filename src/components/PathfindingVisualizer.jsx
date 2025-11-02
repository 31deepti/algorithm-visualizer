import { useMemo, useState } from 'react'
import bfs from '../algorithms/pathfinding/bfs'
import dfs from '../algorithms/pathfinding/dfs'
import dijkstra from '../algorithms/pathfinding/dijkstra'
import aStar from '../algorithms/pathfinding/aStar'
import useAnimationEngine from '../hooks/useAnimationEngine'
import { createGrid, toKey } from '../utils/gridHelpers'

const ROWS = 18
const COLS = 32
const DEFAULT_START = { row: 8, col: 6 }
const DEFAULT_END = { row: 8, col: 25 }
const PATH_ALGORITHMS = { bfs, dfs, dijkstra, aStar }
const SPEED_LEVELS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2, 3, 4, 5]

function PathfindingVisualizer() {
  const [algorithm, setAlgorithm] = useState('dijkstra')
  const [startPoint, setStartPoint] = useState(DEFAULT_START)
  const [endPoint, setEndPoint] = useState(DEFAULT_END)
  const [grid, setGrid] = useState(createGrid(ROWS, COLS, DEFAULT_START, DEFAULT_END))
  const [isDrawing, setIsDrawing] = useState(false)
  const [dragMode, setDragMode] = useState(null)
  const [speedIndex, setSpeedIndex] = useState(SPEED_LEVELS.indexOf(1))

  const steps = useMemo(() => {
    const runAlgorithm = PATH_ALGORITHMS[algorithm] || dijkstra
    return runAlgorithm(grid, startPoint, endPoint)
  }, [algorithm, grid, startPoint, endPoint])

  const speedMultiplier = SPEED_LEVELS[speedIndex]
  const speed = Math.round((220 / (speedMultiplier * 10)))
  const { currentFrame, isPlaying, play, pause, reset } = useAnimationEngine(steps, speed)

  const visited = new Set(currentFrame?.visited || [])
  const frontier = new Set(currentFrame?.frontier || [])
  const path = new Set(currentFrame?.path || [])
  const current = currentFrame?.current || ''

  const toggleWall = (row, col) => {
    setGrid((prev) =>
      prev.map((rowNodes) =>
        rowNodes.map((node) => {
          if (node.row !== row || node.col !== col) return node
          if (node.isStart || node.isEnd) return node
          return { ...node, isWall: !node.isWall }
        }),
      ),
    )
  }

  const clearWalls = () => {
    setGrid((prev) =>
      prev.map((rowNodes) =>
        rowNodes.map((node) => (node.isStart || node.isEnd ? node : { ...node, isWall: false })),
      ),
    )
  }

  const movePoint = (type, row, col) => {
    setGrid((prev) =>
      prev.map((rowNodes) =>
        rowNodes.map((node) => {
          if (type === 'start') {
            if (node.row === startPoint.row && node.col === startPoint.col) {
              return { ...node, isStart: false }
            }
            if (node.row === row && node.col === col) {
              return { ...node, isStart: true, isWall: false, isEnd: false }
            }
            return node
          }

          if (node.row === endPoint.row && node.col === endPoint.col) {
            return { ...node, isEnd: false }
          }
          if (node.row === row && node.col === col) {
            return { ...node, isEnd: true, isWall: false, isStart: false }
          }
          return node
        }),
      ),
    )

    if (type === 'start') {
      setStartPoint({ row, col })
      if (row === endPoint.row && col === endPoint.col) {
        setEndPoint(startPoint)
      }
    } else {
      setEndPoint({ row, col })
      if (row === startPoint.row && col === startPoint.col) {
        setStartPoint(endPoint)
      }
    }
  }

  return (
    <div className="path-layout">
      <aside className="control-panel">
        <h2 className="panel-title">Pathfinding Panel</h2>

        <div className="panel-block">
          <label className="label" htmlFor="pathAlgorithm">
            Algorithm
          </label>
          <select
            id="pathAlgorithm"
            className="select"
            value={algorithm}
            onChange={(event) => setAlgorithm(event.target.value)}
          >
            <option value="dijkstra">Dijkstra</option>
            <option value="aStar">A*</option>
            <option value="bfs">BFS</option>
            <option value="dfs">DFS</option>
          </select>
        </div>

        <div className="panel-block">
          <label className="label" htmlFor="pathSpeed">
            Speed: x{speedMultiplier}
          </label>
          <input
            id="pathSpeed"
            className="range"
            type="range"
            min="0"
            max={SPEED_LEVELS.length - 1}
            step="1"
            value={speedIndex}
            onChange={(event) => setSpeedIndex(Number(event.target.value))}
          />
          {isPlaying ? (
            <button className="button" onClick={pause}>
              Pause
            </button>
          ) : (
            <button className="button" onClick={play}>
              Play
            </button>
          )}
          <button className="button button-secondary" onClick={reset}>
            Reset
          </button>
          <button className="button button-secondary" onClick={clearWalls}>
            Clear Walls
          </button>
        </div>
      </aside>

      <section className="visualizer">
        <h2 className="panel-title">Pathfinding Visualizer</h2>
        <div
          className="grid"
          onMouseLeave={() => {
            setIsDrawing(false)
            setDragMode(null)
          }}
          onMouseUp={() => {
            setIsDrawing(false)
            setDragMode(null)
          }}
        >
          {grid.flat().map((node) => {
            const key = toKey(node.row, node.col)
            let className = 'cell'

            if (node.isWall) className += ' cell-wall'
            if (visited.has(key)) className += ' cell-visited'
            if (frontier.has(key)) className += ' cell-frontier'
            if (path.has(key)) className += ' cell-path'
            if (current === key) className += ' cell-current'
            if (node.isStart) className += ' cell-start'
            if (node.isEnd) className += ' cell-end'

            return (
              <div
                key={key}
                className={className}
                onMouseDown={() => {
                  if (node.isStart) {
                    setDragMode('start')
                    return
                  }
                  if (node.isEnd) {
                    setDragMode('end')
                    return
                  }
                  setIsDrawing(true)
                  toggleWall(node.row, node.col)
                }}
                onMouseEnter={() => {
                  if (dragMode) {
                    if ((dragMode === 'start' && node.isEnd) || (dragMode === 'end' && node.isStart)) {
                      return
                    }
                    movePoint(dragMode, node.row, node.col)
                    return
                  }
                  if (!isDrawing) return
                  toggleWall(node.row, node.col)
                }}
              />
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default PathfindingVisualizer
