import { useState, useRef, useEffect } from 'react'
import { FaCheck, FaBan, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import { selectAbout, selectApp, selectUser } from '../redux/selectors'
import { i18n, LocaleType } from '../locale'
import { useFade } from '../hooks'
import { Button } from '../UI'

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
      setTimeout(() => list?.remove('animate-fade-out-down'), duration / 10)
    } else {
      list?.add('animate-fade-out-down')
      setTimeout(() => setOpen(!open), duration)
    }
  }

  // render styles and locales

  const { buttonDetailsMsg } = i18n(locale, 'buttons') as LocaleType
  const { aboutTitleMsg, aboutYesMsg, aboutNoMsg, aboutOverMsg, aboutUnderMsg, aboutLegendMsg } = i18n(
    locale,
    'about'
  ) as LocaleType

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
    <div className="container animate-fade-in-up" ref={containerRef}>
      <div className="title flexrow5">
        <div className="title__name bold">{aboutTitleMsg}</div>
      </div>
      <div className="about-paragraph">{description[0]}</div>
      <Button onClick={handleOpen}>{buttonDetailsMsg}</Button>
      {open ? (
        <div ref={aboutRef} className="animate-fade-in-up">
          {description.map((el, index) => {
            return (
              <div key={index} className="about-paragraph">
                {!index ? null : el}
              </div>
            )
          })}
          <div className="about-paragraph bold">
            <div>{aboutLegendMsg}</div>
          </div>
          {legend.map(({ icon, text }, index) => (
            <div key={index} className="about-legend flexrow5">
              <div className="about-icon">{icon}</div>
              <div>{text}</div>
            </div>
          ))}
          <div className="about-paragraph">{last}</div>
          <hr />
          <div className="about-copyright">
            <a href="https://t.me/packersnews">Green 19</a>
            {copyright}
          </div>
        </div>
      ) : null}
    </div>
  )
}
