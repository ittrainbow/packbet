import { useRef, useEffect, useState } from 'react'

import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa'
import { FadeRefType } from '../types'

export const Arrows = () => {
  const arrowsRef = useRef<HTMLDivElement>(null)
  const arrowTopRef = useRef<HTMLDivElement>(null)
  const arrowBottomRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState<boolean>(false)

  // animate

  useEffect(() => {
    let listener = () => {
      const list = arrowsRef.current?.classList
      if (window.scrollY > 250 && !scrolled) {
        setScrolled(true)
        list?.add('arrows-show')
        list?.remove('arrows-hide')
      }
      if (window.scrollY < 250 && scrolled) {
        list?.remove('arrows-show')
        list?.add('arrows-hide')
        setTimeout(() => setScrolled(false), 200)
      }
    }

    window.addEventListener('scroll', listener)
    return () => window.removeEventListener('scroll', listener)
    // eslint-disable-next-line
  }, [scrolled])

  // action handlers

  const handleScroll = (direction: string) => {
    const handleClass = (ref: FadeRefType) => {
      const list = ref.current?.classList
      list?.add('arrows-green')
      list?.remove('arrows-grey')
      setTimeout(() => {
        list?.remove('arrows-green')
        list?.add('arrows-grey')
      }, 200)
    }

    direction === 'top' ? handleClass(arrowTopRef) : handleClass(arrowBottomRef)

    setTimeout(() => {
      const height = document.body.scrollHeight
      window.scrollTo({ top: direction === 'top' ? 0 : height, behavior: 'smooth' })
    }, 50)
  }

  return (
    <div className="arrows-container" ref={arrowsRef} style={{ opacity: scrolled ? 1 : 0 }}>
      <div ref={arrowTopRef}>
        <FaArrowCircleUp onClick={() => handleScroll('top')} />
      </div>
      <div ref={arrowBottomRef}>
        <FaArrowCircleDown onClick={() => handleScroll('bottom')} />
      </div>
    </div>
  )
}
