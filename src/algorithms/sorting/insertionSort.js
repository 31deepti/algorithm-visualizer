function insertionSort(array) {
  const result = [...array]
  const steps = []

  const pushStep = (comparing = [], swapping = [], sorted = []) => {
    steps.push({
      array: result.slice(),
      comparing,
      swapping,
      sorted,
    })
  }

  pushStep()

  for (let i = 1; i < result.length; i++) {
    const key = result[i]
    let j = i - 1

    while (j >= 0) {
      pushStep([j, j + 1])
      if (result[j] > key) {
        result[j + 1] = result[j]
        pushStep([], [j, j + 1])
        j--
      } else {
        break
      }
    }

    result[j + 1] = key
    pushStep([], [j + 1])
  }

  if (result.length > 0) {
    pushStep([], [], Array.from({ length: result.length }, (_, index) => index))
  }

  return steps
}

export default insertionSort
