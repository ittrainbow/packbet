import { useState, useRef } from 'react'
import { FaCheck, FaBan, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import { selectAbout, selectUser } from '../redux/selectors'
import { Button } from '../UI'
import { i18n } from '../locale'
import { LocaleType } from '../types'

export const About = () => {
  const about = useSelector(selectAbout)
  const { locale } = useSelector(selectUser)
  const [open, setOpen] = useState(false)
  const aboutRef = useRef<HTMLDivElement>(null)

  const { buttonDetailsMsg } = i18n(locale, 'buttons') as LocaleType
  const { aboutYesMsg, aboutNoMsg, aboutOverMsg, aboutUnderMsg, devMsg } = i18n(locale, 'about') as LocaleType

  const legend = [
    { icon: <FaCheck className="FaCheck" />, text: aboutYesMsg },
    { icon: <FaBan className="FaBan" />, text: aboutNoMsg },
    { icon: <FaArrowUp className="FaArrowUp" />, text: aboutOverMsg },
    { icon: <FaArrowDown className="FaArrowDown" />, text: aboutUnderMsg }
  ]

  const openHandler = () => {
    const list = aboutRef.current?.classList
    if (!open) {
      setOpen(!open)
      setTimeout(() => list?.remove('animate-fade-out-down'), 20)
    } else {
      list?.add('animate-fade-out-down')
      setTimeout(() => setOpen(!open), 300)
    }
  }

  const description = Object.values(about[locale])

  return (
    <div className="container animate-fade-in-up">
      <div className="about__paragraph">{description[0]}</div>
      <Button onClick={openHandler}>{buttonDetailsMsg}</Button>
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
          <div className="about__paragraph">
            {devMsg} <a href="https://t.me/packersnews">Green 19</a>
          </div>
        </div>
      ) : null}
    </div>
  )
}
