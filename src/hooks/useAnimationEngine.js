import { useEffect, useMemo, useState } from 'react'

function useAnimationEngine(steps, speed = 500) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setCurrentStep(0)
    setIsPlaying(false)
  }, [steps])

  useEffect(() => {
    if (!isPlaying) return
    if (steps.length <= 1) return

    const id = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, speed)

    return () => clearInterval(id)
  }, [isPlaying, speed, steps])

  const currentFrame = useMemo(() => steps[currentStep] || [], [steps, currentStep])

  const play = () => {
    setCurrentStep((prev) => (prev >= steps.length - 1 ? 0 : prev))
    setIsPlaying(true)
  }
  const pause = () => setIsPlaying(false)
  const reset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  return {
    currentStep,
    currentFrame,
    isPlaying,
    play,
    pause,
    reset,
    setCurrentStep,
    totalSteps: steps.length,
  }
}

export default useAnimationEngine