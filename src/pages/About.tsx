import { useState, useRef, useEffect } from 'react'
import { FaCheck, FaBan, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import { selectAbout, selectApp, selectUser } from '../redux/selectors'
import { animateFadeOut } from '../helpers'
import { LocaleType } from '../types'
import { i18n } from '../locale'
import { Button } from '../UI'

export const About = () => {
  const { tabActive, duration } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const about = useSelector(selectAbout)
  const containerRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  // container fade animations

  useEffect(() => {
    tabActive !== 0 && animateFadeOut(containerRef)
  }, [tabActive])

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
  const { aboutYesMsg, aboutNoMsg, aboutOverMsg, aboutUnderMsg } = i18n(locale, 'about') as LocaleType

  const legend = [
    { icon: <FaCheck className="FaCheck" />, text: aboutYesMsg },
    { icon: <FaBan className="FaBan" />, text: aboutNoMsg },
    { icon: <FaArrowUp className="FaArrowUp" />, text: aboutOverMsg },
    { icon: <FaArrowDown className="FaArrowDown" />, text: aboutUnderMsg }
  ]

  const description = Object.values(about[locale])

  const copyright = ` ${String.fromCodePoint(0x00a9)} ${new Date().getFullYear()}`

  return (
    <div className="container animate-fade-in-up" ref={containerRef}>
      <div className="about__paragraph">{description[0]}</div>
      <Button onClick={handleOpen}>{buttonDetailsMsg}</Button>
      {open ? (
        <div ref={aboutRef} className="animate-fade-in-up">
          {description.map((el, index) => {
            const classes = `about__paragraph` + (index === 8 ? ' bold' : '')

            return index < 9 ? (
              <div key={index} className={classes}>
                {!index ? null : el}
              </div>
            ) : null
          })}
          {legend.map(({ icon, text }, index) => (
            <div key={index} className="legend">
              <div className="legend__icon">{icon}</div>- {text}
            </div>
          ))}
          <div className="about__paragraph">
            <div>{description[9]}</div>
          </div>
          <hr />
          <div className="about__paragraph copyright">
            <a href="https://t.me/packersnews">Green 19</a>
            {copyright}
          </div>
        </div>
      ) : null}
    </div>
  )
}
