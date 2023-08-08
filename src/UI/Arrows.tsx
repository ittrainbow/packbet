import { useRef, useEffect, useState } from 'react'

import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa'

export const Arrows = () => {
  const arrowsRef = useRef<HTMLDivElement>(null)
  const arrowTopRef = useRef<HTMLDivElement>(null)
  const arrowBottomRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    let listener = () => {
      if (window.scrollY > 250 && !scrolled) {
        setScrolled(true)
        arrowsRef.current?.classList.add('arrows-show')
        arrowsRef.current?.classList.remove('arrows-hide')
      }
      if (window.scrollY < 250 && scrolled) {
        arrowsRef.current?.classList.remove('arrows-show')
        arrowsRef.current?.classList.add('arrows-hide')
        setTimeout(() => setScrolled(false), 300)
      }
    }

    window.addEventListener('scroll', listener)
    return () => window.removeEventListener('scroll', listener)
    // eslint-disable-next-line
  }, [scrolled])

  const scrollHandler = (direction: string) => {
    const classHandler = (ref: React.RefObject<HTMLDivElement>) => {
      ref.current?.classList.add('arrows-green')
      ref.current?.classList.remove('arrows-grey')
      setTimeout(() => {
        ref.current?.classList.remove('arrows-green')
        ref.current?.classList.add('arrows-grey')
      }, 200)
    }

    direction === 'top' ? classHandler(arrowTopRef) : classHandler(arrowBottomRef)

    setTimeout(() => {
      window.scrollTo({ top: direction === 'top' ? 0 : document.body.scrollHeight, behavior: 'smooth' })
    }, 50)
  }

  return (
    <div className="arrows-container" ref={arrowsRef} style={{ opacity: scrolled ? 1 : 0 }}>
      <div ref={arrowTopRef}>
        <FaArrowCircleUp onClick={() => scrollHandler('top')} />
      </div>
      <div ref={arrowBottomRef}>
        <FaArrowCircleDown onClick={() => scrollHandler('bottom')} />
      </div>
    </div>
  )
}
