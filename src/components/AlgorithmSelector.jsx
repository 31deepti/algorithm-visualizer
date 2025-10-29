function AlgorithmSelector({ value, onChange }) {
  return (
    <div className="panel-block">
      <label className="label" htmlFor="algorithm">
        Algorithm
      </label>
      <select
        id="algorithm"
        className="select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="bubbleSort">Bubble Sort</option>
      </select>
    </div>
  )
}

export default AlgorithmSelector
