function selectionSort(array) {
  const result = [...array]
  const steps = []
  const sortedIndices = []

  const pushStep = (comparing = [], swapping = []) => {
    steps.push({
      array: result.slice(),
      comparing,
      swapping,
      sorted: sortedIndices.slice(),
    })
  }

  pushStep()

  for (let i = 0; i < result.length - 1; i++) {
    let minIndex = i

    for (let j = i + 1; j < result.length; j++) {
      pushStep([minIndex, j])
      if (result[j] < result[minIndex]) {
        minIndex = j
      }
    }

    if (minIndex !== i) {
      pushStep([], [i, minIndex])
      ;[result[i], result[minIndex]] = [result[minIndex], result[i]]
      pushStep([], [i, minIndex])
    }

    sortedIndices.push(i)
    pushStep()
  }

  if (result.length > 0) {
    sortedIndices.length = 0
    for (let i = 0; i < result.length; i++) sortedIndices.push(i)
    pushStep()
  }

  return steps
}

export default selectionSort
