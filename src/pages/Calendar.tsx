import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Weeklist } from './Weeklist'
import { selectApp } from '../redux/selectors'
import { fadeInOut } from '../helpers'

export const Calendar = () => {
  const { tabActive } = useSelector(selectApp)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    tabActive !== 5 && fadeInOut(containerRef)
  }, [tabActive])

  return (
    <div className="container animate-fade-in-up" ref={containerRef}>
      <Weeklist />
    </div>
  )
}
