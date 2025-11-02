import AlgorithmSelector from './AlgorithmSelector'
import InputPanel from './InputPanel'
import RandomizePanel from './RandomizePanel'

function ControlPanel({
  algorithm,
  onAlgorithmChange,
  inputValue,
  onInputChange,
  onApplyInput,
  randomLength,
  onRandomLengthChange,
  onRandomizeArray,
  speedMultiplier,
  speedIndex,
  maxSpeedIndex,
  onSpeedChange,
  onPlay,
  onPause,
  onReset,
  isPlaying,
}) {
  return (
    <aside className="control-panel">
      <h2 className="panel-title">Control Panel</h2>
      <AlgorithmSelector value={algorithm} onChange={onAlgorithmChange} />
      <InputPanel value={inputValue} onChange={onInputChange} onApply={onApplyInput} />
      <RandomizePanel
        lengthValue={randomLength}
        onLengthChange={onRandomLengthChange}
        onRandomize={onRandomizeArray}
      />

      <div className="panel-block">
        <label className="label" htmlFor="speedRange">
          Speed: x{speedMultiplier}
        </label>
        <input
          id="speedRange"
          className="range"
          type="range"
          min="0"
          max={maxSpeedIndex}
          step="1"
          value={speedIndex}
          onChange={(event) => onSpeedChange(Number(event.target.value))}
        />
        {isPlaying ? (
          <button className="button" onClick={onPause}>
            Pause
          </button>
        ) : (
          <button className="button" onClick={onPlay}>
            Play
          </button>
        )}
        <button className="button button-secondary" onClick={onReset}>
          Reset
        </button>
      </div>
    </aside>
  )
}

export default ControlPanel
