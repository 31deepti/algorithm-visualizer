function RandomizePanel({ lengthValue, onLengthChange, onRandomize }) {
  return (
    <div className="panel-block">
      <label className="label" htmlFor="randomLength">
        Random Length
      </label>
      <div className="input-row">
        <input
          id="randomLength"
          className="input"
          type="number"
          min="5"
          max="50"
          value={lengthValue}
          onChange={(event) => onLengthChange(event.target.value)}
        />
        <button className="button button-secondary" onClick={onRandomize}>
          Randomize
        </button>
      </div>
    </div>
  )
}

export default RandomizePanel
