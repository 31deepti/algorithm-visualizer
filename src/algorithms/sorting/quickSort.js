function quickSort(array) {
  const result = [...array]
  const steps = []
  const sortedIndices = new Set()

  const pushStep = (comparing = [], swapping = []) => {
    steps.push({
      array: result.slice(),
      comparing,
      swapping,
      sorted: Array.from(sortedIndices).sort((a, b) => a - b),
    })
  }

  const partition = (low, high) => {
    const pivot = result[high]
    let i = low - 1

    for (let j = low; j < high; j++) {
      pushStep([j, high])
      if (result[j] <= pivot) {
        i++
        if (i !== j) {
          pushStep([], [i, j])
          ;[result[i], result[j]] = [result[j], result[i]]
          pushStep([], [i, j])
        }
      }
    }

    if (i + 1 !== high) {
      pushStep([], [i + 1, high])
      ;[result[i + 1], result[high]] = [result[high], result[i + 1]]
      pushStep([], [i + 1, high])
    }

    return i + 1
  }

  const sort = (low, high) => {
    if (low > high) return
    if (low === high) {
      sortedIndices.add(low)
      pushStep()
      return
    }

    const pivotIndex = partition(low, high)
    sortedIndices.add(pivotIndex)
    pushStep()
    sort(low, pivotIndex - 1)
    sort(pivotIndex + 1, high)
  }

  pushStep()
  sort(0, result.length - 1)

  if (result.length > 0) {
    for (let i = 0; i < result.length; i++) sortedIndices.add(i)
    pushStep()
  }

  return steps
}

export default quickSort
