import React, { useState, useEffect } from 'react'
import { FaCheck, FaBan, FaArrowUp, FaArrowDown } from 'react-icons/fa'

import './About.scss'

import { useAppContext } from '../../context/Context'
import { Button } from '../../UI'
import { i18n } from '../../locale/locale'

export const About = () => {
  const [open, setOpen] = useState(false)
  const { aboutContext, userContext } = useAppContext()
  const { locale } = userContext
  const [description, setDescription] = useState([])

  useEffect(() => {
    if (locale && aboutContext) {
      const array = Object.values(aboutContext[locale])
      setDescription(array)
    }
  }, [locale, aboutContext])

  // locale
  const { buttonDetailsMsg } = i18n(locale, 'buttons')
  const { aboutYesMsg, aboutNoMsg, aboutOverMsg, aboutUnderMsg, devMsg } = i18n(locale, 'about')

  const legend = [
    { icon: <FaCheck className="FaCheck" />, text: aboutYesMsg },
    { icon: <FaBan className="FaBan" />, text: aboutNoMsg },
    { icon: <FaArrowUp className="FaArrowUp" />, text: aboutOverMsg },
    { icon: <FaArrowDown className="FaArrowDown" />, text: aboutUnderMsg }
  ]

  const openHandler = () => setOpen(prev => !prev)

  return (
    <div className="container">
      <div className="about__paragraph">{description[0]}</div>
      <Button onClick={openHandler}>{buttonDetailsMsg}</Button>
      <div>
        {open ? (
          <div>
            {description.map((el, index) => {
              const classes = `about__paragraph` + (index === 6 ? ' bold' : '')

              return index < 8 ? (
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
            {description.length === 9 ? (
              <div className="about__paragraph">
                <div>{description[8]}</div>
              </div>
            ) : null}
            <hr />
            <div className="about__paragraph about__last-div">{devMsg}</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
