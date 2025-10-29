function bubbleSort(array) {
  const result = [...array]
  const makeStep = (comparing = [], swapping = [], sorted = []) => ({
    array: result.slice(),
    comparing,
    swapping,
    sorted,
  })
  const steps = [makeStep()]
  const sortedIndices = []

  for (let i = 0; i < result.length - 1; i++) {
    let swapped = false

    for (let j = 0; j < result.length - 1 - i; j++) {
      steps.push(makeStep([j, j + 1], [], sortedIndices))
      if (result[j] > result[j + 1]) {
        steps.push(makeStep([], [j, j + 1], sortedIndices))
        ;[result[j], result[j + 1]] = [result[j + 1], result[j]]
        steps.push(makeStep([], [j, j + 1], sortedIndices))
        swapped = true
      }
    }

    sortedIndices.push(result.length - 1 - i)
    steps.push(makeStep([], [], sortedIndices))

    if (!swapped) {
      for (let k = 0; k < result.length - 1 - i; k++) {
        if (!sortedIndices.includes(k)) {
          sortedIndices.push(k)
        }
      }
      break
    }
  }

  if (result.length === 1) {
    steps.push(makeStep([], [], [0]))
  } else {
    const allSorted = Array.from({ length: result.length }, (_, index) => index)
    steps.push(makeStep([], [], allSorted))
  }

  return steps
}

export default bubbleSort