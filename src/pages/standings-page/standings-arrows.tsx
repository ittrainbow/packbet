import { useEffect, useState } from 'react'
import { FaArrowCircleDown, FaArrowCircleUp } from '@/icons'

import clsx from 'clsx'

function getScrollRoot() {
  return document.getElementById('root')
}

export function StandingsArrows() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const root = getScrollRoot()
    if (!root) return

    const onScroll = () => {
      setScrolled(root.scrollTop > 250)
    }

    onScroll()
    root.addEventListener('scroll', onScroll, { passive: true })
    return () => root.removeEventListener('scroll', onScroll)
  }, [])

  const handleScroll = (direction: 'top' | 'bottom') => {
    const root = getScrollRoot()
    if (!root) return
    root.scrollTo({
      top: direction === 'top' ? 0 : root.scrollHeight,
      behavior: 'smooth'
    })
  }

  return (
    <div
      className={clsx(
        'standings-arrows grid w-12 gap-2 z-10 fixed transition-all duration-500',
        scrolled ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
    >
      <button
        type="button"
        onClick={() => handleScroll('top')}
        className="transition text-ink-muted active:text-accent text-[48px]"
      >
        <FaArrowCircleUp />
      </button>
      <button
        type="button"
        onClick={() => handleScroll('bottom')}
        className="transition text-ink-muted active:text-accent text-[48px]"
      >
        <FaArrowCircleDown />
      </button>
    </div>
  )
}
