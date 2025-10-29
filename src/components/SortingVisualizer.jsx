import { useMemo, useState } from 'react'
import bubbleSort from '../algorithms/sorting/bubbleSort'
import selectionSort from '../algorithms/sorting/selectionSort'
import insertionSort from '../algorithms/sorting/insertionSort'
import mergeSort from '../algorithms/sorting/mergeSort'
import quickSort from '../algorithms/sorting/quickSort'
import useAnimationEngine from '../hooks/useAnimationEngine'
import ControlPanel from './ControlPanel'

const SPEED_LEVELS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2, 3, 4, 5]
const SORTING_ALGORITHMS = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
}

function parseInputArray(input) {
  const values = input
    .split(',')
    .map((item) => Number(item.trim()))
    .filter((value) => Number.isFinite(value))

  return values.length > 0 ? values : [5, 3, 8, 4, 2, 10, 12, 1, 5]
}

function SortingVisualizer() {
  const [algorithm, setAlgorithm] = useState('bubbleSort')
  const [inputValue, setInputValue] = useState('5, 3, 8, 4, 2, 10, 12, 1, 5')
  const [sourceArray, setSourceArray] = useState([5, 3, 8, 4, 2, 10, 12, 1, 5])
  const [speedIndex, setSpeedIndex] = useState(9)

  const steps = useMemo(() => {
    const runAlgorithm = SORTING_ALGORITHMS[algorithm] || bubbleSort
    return runAlgorithm(sourceArray)
  }, [algorithm, sourceArray])

  const speedMultiplier = SPEED_LEVELS[speedIndex]
  const speed = Math.max(60, Math.round(450 / speedMultiplier))

  const { currentFrame, isPlaying, play, pause, reset } = useAnimationEngine(steps, speed)

  const currentArray = Array.isArray(currentFrame) ? currentFrame : currentFrame.array || []
  const comparing = Array.isArray(currentFrame) ? [] : currentFrame.comparing || []
  const swapping = Array.isArray(currentFrame) ? [] : currentFrame.swapping || []
  const sorted = Array.isArray(currentFrame) ? [] : currentFrame.sorted || []

  const maxValue = useMemo(() => {
    if (currentArray.length === 0) return 1
    return Math.max(...currentArray, 1)
  }, [currentArray])

  const applyInput = () => {
    const parsed = parseInputArray(inputValue)
    setSourceArray(parsed)
  }

  const handlePlay = () => {
    play()
  }

  return (
    <div className="layout">
      <ControlPanel
        algorithm={algorithm}
        onAlgorithmChange={setAlgorithm}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onApplyInput={applyInput}
        speedMultiplier={speedMultiplier}
        speedIndex={speedIndex}
        maxSpeedIndex={SPEED_LEVELS.length - 1}
        onSpeedChange={setSpeedIndex}
        onPlay={handlePlay}
        onPause={pause}
        onReset={reset}
        isPlaying={isPlaying}
      />

      <section className="visualizer">
        <h2 className="panel-title">Sorting Visualizer</h2>
        <div className="bars">
          {currentArray.map((value, index) => {
            let stateClass = 'bar-default'
            if (sorted.includes(index)) stateClass = 'bar-sorted'
            if (comparing.includes(index)) stateClass = 'bar-comparing'
            if (swapping.includes(index)) stateClass = 'bar-swapping'

            return (
            <div key={`${index}-${value}`} className="bar-wrap">
              <div className="bar-track">
                <div
                  className={`bar ${stateClass}`}
                  style={{ height: `${(value / maxValue) * 100}%` }}
                  title={String(value)}
                />
              </div>
              <span className="bar-label">{value}</span>
            </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default SortingVisualizer
