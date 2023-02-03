import React, { useState, useContext } from 'react'
import { FaCheck, FaBan, FaArrowUp, FaArrowDown } from 'react-icons/fa'

import './About.scss'

import { Context } from '../../App'
import { Button } from '../../UI'
import { i18n } from '../../locale/locale'

const aboutLegend = [
  { icon: <FaCheck className="FaCheck" />, text: 'ответ "Да"' },
  { icon: <FaBan className="FaBan" />, text: 'ответ "Нет"' },
  { icon: <FaArrowUp className="FaArrowUp" />, text: 'ответ "Больше"' },
  { icon: <FaArrowDown className="FaArrowDown" />, text: 'ответ "Меньше"' }
]

export const About = () => {
  const [open, setOpen] = useState(false)
  const { aboutContext, userContext } = useContext(Context)
  const { locale } = userContext

  const { buttonDetailsMsg } = i18n(locale, 'buttons')

  return (
    <div className="container">
      <div className="about__paragraph">
        Каждую неделю до конца сезона мы будем представлять вашему вниманию прогнозы по "тоталам" на
        игры Пэкерз. Вам нужно будет угадать, произойдет ли то или иное событие.
      </div>
      <Button onClick={() => setOpen(!open)}>{buttonDetailsMsg}</Button>
      <div>
        {open ? (
          <>
            {aboutContext.map((el, index) => (
              <div key={index} className="about__paragraph">
                {el}
              </div>
            ))}
            {aboutLegend.map(({ icon, text }, index) => (
              <div key={index} className="legend">
                <div className="legend__icon">{icon}</div>- {text}
              </div>
            ))}
            <hr />
            <div className="paragraph">
              Обратная связь - <a href="https://t.me/ittrainbow">ittrainbow</a>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
