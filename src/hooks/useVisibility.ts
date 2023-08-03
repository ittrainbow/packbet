import { useState, useEffect, useMemo } from 'react'

export const useRefVisibility = (ref: React.RefObject<HTMLDivElement>) => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)
  const observer = useMemo(() => new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting)), [])
  useEffect(() => {
    ref.current && observer.observe(ref.current as HTMLDivElement)
    return () => {
      observer.disconnect()
    }
  }, [ref, observer])
  return isIntersecting
}

export const useDivVisibility = (div: HTMLElement | null, partiallyVisible = false) => {
  if (div) {
    const { top, left, bottom, right } = div.getBoundingClientRect()
    const { innerHeight, innerWidth } = window
    return partiallyVisible
      ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight * 0.75)) &&
          ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight * 0.75 && right <= innerWidth
  }
}
