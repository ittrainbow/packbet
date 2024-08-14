import { useEffect, useRef, useState } from 'react'
import { FaArrowDown, FaArrowUp, FaBan, FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import { useFade } from '../hooks'
import { Locale, i18n } from '../locale'
import { selectAbout, selectApp, selectUser } from '../redux/selectors'
import { Button } from '../ui'

export const About = () => {
  const { tabActive, duration } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const about = useSelector(selectAbout)
  const containerRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const triggerFade = useFade(containerRef)

  useEffect(() => {
    tabActive !== 0 && triggerFade()
  }, [tabActive, triggerFade])

  // action handlers

  const handleOpen = () => {
    const list = aboutRef.current?.classList
    if (!open) {
      setOpen(!open)
      return setTimeout(() => list?.remove('animate-fade-out-down'), duration / 10)
    }

    list?.add('animate-fade-out-down')
    setTimeout(() => setOpen(!open), duration)
  }

  // render styles and locales

  const { buttonDetailsMsg } = i18n(locale, 'buttons') as Locale
  const { aboutTitleMsg, aboutYesMsg, aboutNoMsg, aboutOverMsg, aboutUnderMsg, aboutLegendMsg } = i18n(
    locale,
    'about'
  ) as Locale

  const legend = [
    { icon: <FaCheck className="FaCheck" />, text: aboutYesMsg },
    { icon: <FaBan className="FaBan" />, text: aboutNoMsg },
    { icon: <FaArrowUp className="FaArrowUp" />, text: aboutOverMsg },
    { icon: <FaArrowDown className="FaArrowDown" />, text: aboutUnderMsg }
  ]

  const description = Object.values(about[locale])
  const last = description.pop()

  const copyright = ` ${String.fromCodePoint(0x00a9)} 2022-${new Date().getFullYear()}`

  return (
    <span className="p-3 text-md leading-5 flex flex-col gap-2 animate-fade-in-up" ref={containerRef}>
      <span className="font-bold">{aboutTitleMsg}</span>

      <span>{description[0]}</span>
      <Button onClick={handleOpen}>{buttonDetailsMsg}</Button>
      {open ? (
        <>
          {description.map((el, index) => {
            return <span key={index}>{!index ? null : el}</span>
          })}
          <span className="font-bold">{aboutLegendMsg}</span>
          {legend.map(({ icon, text }, index) => (
            <div key={index} className="flex flex-wrap gap-1">
              <span className="flex items-center">{icon}</span>
              <span>{text}</span>
            </div>
          ))}
          <div className="about-paragraph">{last}</div>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-400" />
          <div className="about-copyright text-gray-600">
            <a href="https://t.me/packersnews">Green 19</a>
            {copyright}
          </div>
        </>
      ) : null}
    </span>
  )
}
