import { useEffect, useState } from 'react'

export const useSkeletonDelay = (delayMs = 900) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeoutId = globalThis.setTimeout(() => {
      setIsLoading(false)
    }, delayMs)

    return () => {
      globalThis.clearTimeout(timeoutId)
    }
  }, [delayMs])

  return isLoading
}
