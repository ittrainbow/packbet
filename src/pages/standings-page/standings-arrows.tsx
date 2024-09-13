import { useEffect, useState } from 'react'
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa'

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
        'grid h-24 w-12 gap-2 bottom-16 start-72 sm:start-[32rem] z-10 fixed transition-all duration-500',
        !scrolled ? 'opacity-0' : 'opacity-100'
      )}
    >
      <button
        onClick={() => handleScroll('top')}
        className="transition text-gray-400 active:text-green-600 text-[48px]"
      >
        <FaArrowCircleUp />
      </button>
      <button
        onClick={() => handleScroll('bottom')}
        className="transition text-gray-400 active:text-green-600 text-[48px]"
      >
        <FaArrowCircleDown />
      </button>
    </div>
  )
}
