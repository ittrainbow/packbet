import { useEffect, useRef, useState } from 'react'
import { FaArrowDown, FaArrowUp, FaBan, FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import clsx from 'clsx'
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

  const handleOpen = () => {
    const list = aboutRef.current?.classList
    if (!open) {
      setOpen(!open)
      return setTimeout(() => list?.remove('animate-fade-out-down'), duration / 10)
    }

    list?.add('animate-fade-out-down')
    setTimeout(() => setOpen(!open), duration)
  }

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

  return (
    <div
      className="p-4 leading-5 h-[calc(100vh-4.5rem)] sm:h-[calc(100vh-6rem)] grid grid-rows-[auto,auto,auto,1fr] gap-2 animate-fade-in-up max-w-[32rem]"
      ref={containerRef}
    >
      <span className="font-bold text-base">{aboutTitleMsg}</span>
      <span>{description[0]}</span>
      <Button onClick={handleOpen} text={buttonDetailsMsg} className="min-h-10" />
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
          <span>{last}</span>
          <hr className="h-px border-0 bg-gray-400" />
        </>
      ) : null}
      <div className={clsx('flex justify-center items-end pt-2 text-gray-600', open ? 'pb-4' : 'pb-0')}>
        <a href="https://t.me/packersnews">
          Green 19 {`${String.fromCodePoint(0x00a9)} 2022-${new Date().getFullYear()}`}
        </a>
      </div>
    </div>
  )
}
