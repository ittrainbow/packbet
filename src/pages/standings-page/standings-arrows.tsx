import { useEffect, useState } from 'react'
import { FaArrowCircleDown, FaArrowCircleUp } from '@/icons'

import clsx from 'clsx'

export const StandingsArrows = () => {
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    let listener = () => {
      if (window.scrollY > 250 && !scrolled) setScrolled(true)
      if (window.scrollY < 250 && scrolled) setScrolled(false)
    }

    window.addEventListener('scroll', listener)
    return () => window.removeEventListener('scroll', listener)
  }, [scrolled])

  const handleScroll = (direction: 'top' | 'bottom') =>
    setTimeout(() => window.scrollTo({ top: direction === 'top' ? 0 : document.body.scrollHeight, behavior: 'smooth' }))

  return (
    <div
      className={clsx(
        'standings-arrows grid w-12 gap-2 z-10 fixed transition-all duration-500',
        !scrolled ? 'opacity-0' : 'opacity-100'
      )}
    >
      <button
        onClick={() => handleScroll('top')}
        className="transition text-ink-muted active:text-accent text-[48px]"
      >
        <FaArrowCircleUp />
      </button>
      <button
        onClick={() => handleScroll('bottom')}
        className="transition text-ink-muted active:text-accent text-[48px]"
      >
        <FaArrowCircleDown />
      </button>
    </div>
  )
}
