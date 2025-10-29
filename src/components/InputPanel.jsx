function InputPanel({ value, onChange, onApply }) {
  return (
    <div className="panel-block">
      <label className="label" htmlFor="arrayInput">
        Input Array
      </label>
      <input
        id="arrayInput"
        className="input"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="5, 3, 8, 4, 2, 10, 12, 1, 5"
      />
      <button className="button button-secondary" onClick={onApply}>
        Apply Input
      </button>
    </div>
  )
}

export default InputPanel
