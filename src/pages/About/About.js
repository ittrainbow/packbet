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
    const array = []
    Object.keys(aboutContext[locale]).forEach((el) => array.push(aboutContext[locale][el]))
    setDescription(array) // eslint-disable-next-line
  }, [])

  // locale
  const { buttonDetailsMsg } = i18n(locale, 'buttons')
  const { aboutYesMsg, aboutNoMsg, aboutOverMsg, aboutUnderMsg, devMsg } = i18n(locale, 'about')

  const legend = [
    { icon: <FaCheck className="FaCheck" />, text: aboutYesMsg },
    { icon: <FaBan className="FaBan" />, text: aboutNoMsg },
    { icon: <FaArrowUp className="FaArrowUp" />, text: aboutOverMsg },
    { icon: <FaArrowDown className="FaArrowDown" />, text: aboutUnderMsg }
  ]

  return (
    <div className="container">
      <div className="about__paragraph">{description[0]}</div>
      <Button onClick={() => setOpen(!open)}>{buttonDetailsMsg}</Button>
      <div>
        {open ? (
          <div>
            {description.map((el, index) => {
              return index < 8 ? (
                <div
                  key={index}
                  className={index === 6 ? 'about__paragraph bold' : 'about__paragraph'}
                >
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
