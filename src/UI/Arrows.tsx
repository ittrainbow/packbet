import { useRef, useEffect, useState } from 'react'

import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa'

export const Arrows = () => {
  const arrowsRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    let listener = () => {
      if (window.scrollY > 350 && !scrolled) {
        setScrolled(true)
        arrowsRef.current?.classList.add('arrows-show')
        arrowsRef.current?.classList.remove('arrows-hide')
      }
      if (window.scrollY < 350 && scrolled) {
        arrowsRef.current?.classList.remove('arrows-show')
        arrowsRef.current?.classList.add('arrows-hide')
        setTimeout(() => setScrolled(false), 500)
      }
    }

    window.addEventListener('scroll', listener)
    return () => window.removeEventListener('scroll', listener)
    // eslint-disable-next-line
  }, [scrolled])

  const scrollHandler = (direction: string) => {
    arrowsRef.current?.classList.add('arrows-green')
    window.scrollTo({ top: direction === 'top' ? 0 : document.body.scrollHeight, behavior: 'smooth' })
    setTimeout(() => arrowsRef.current?.classList.remove('arrows-green'), 200)
  }

  return (
    <div className="arrows-container" ref={arrowsRef}>
      <FaArrowCircleUp onClick={() => scrollHandler('top')} />
      <FaArrowCircleDown onClick={() => scrollHandler('bottom')} />
    </div>
  )
}
