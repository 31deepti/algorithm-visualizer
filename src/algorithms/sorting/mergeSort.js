function mergeSort(array) {
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

  const merge = (left, mid, right) => {
    const leftPart = result.slice(left, mid + 1)
    const rightPart = result.slice(mid + 1, right + 1)
    let i = 0
    let j = 0
    let k = left

    while (i < leftPart.length && j < rightPart.length) {
      pushStep([left + i, mid + 1 + j])
      if (leftPart[i] <= rightPart[j]) {
        result[k] = leftPart[i]
        pushStep([], [k])
        i++
      } else {
        result[k] = rightPart[j]
        pushStep([], [k])
        j++
      }
      k++
    }

    while (i < leftPart.length) {
      result[k] = leftPart[i]
      pushStep([], [k])
      i++
      k++
    }

    while (j < rightPart.length) {
      result[k] = rightPart[j]
      pushStep([], [k])
      j++
      k++
    }
  }

  const sort = (left, right) => {
    if (left >= right) return
    const mid = Math.floor((left + right) / 2)
    sort(left, mid)
    sort(mid + 1, right)
    merge(left, mid, right)
  }

  pushStep()
  sort(0, result.length - 1)

  if (result.length > 0) {
    pushStep([], [], Array.from({ length: result.length }, (_, index) => index))
  }

  return steps
}

export default mergeSort
