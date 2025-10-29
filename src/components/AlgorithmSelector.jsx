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
        <option value="selectionSort">Selection Sort</option>
        <option value="insertionSort">Insertion Sort</option>
        <option value="mergeSort">Merge Sort</option>
        <option value="quickSort">Quick Sort</option>
      </select>
    </div>
  )
}

export default AlgorithmSelector
