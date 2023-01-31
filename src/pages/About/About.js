import React, { useState, useContext } from 'react'
import { FaCheck, FaBan, FaArrowUp, FaArrowDown } from 'react-icons/fa'

import './About.scss'

import { Context } from '../../App'

const aboutLegend = [
  {icon: <FaCheck className="FaCheck" />, text: 'ответ "Да"'},
  {icon: <FaBan className="FaBan" />, text: 'ответ "Нет"'},
  {icon: <FaArrowUp className="FaArrowUp" />, text: 'ответ "Больше"'},
  {icon: <FaArrowDown className="FaArrowDown" />, text: 'ответ "Меньше"'}
]

export const About = () => {
  const [open, setOpen] = useState(false)
  const { aboutContext } = useContext(Context)

  return (
    <div className="container">
      <div className="paragraph">
        Каждую неделю до конца сезона мы будем представлять вашему вниманию прогнозы по "тоталам" на
        игры Пэкерз. Вам нужно будет угадать, произойдет ли то или иное событие.
      </div>
      <button onClick={() => setOpen(!open)} className="btn">
        Об игре
      </button>
      <div>
        {open ? (
          <>
            {aboutContext.map((el, index) => (
              <div key={index} className="paragraph">
                {el}
              </div>
            ))}
            {aboutLegend.map(({ icon, text }, index) => (
              <div key={index} className="legend">
                {icon} - {text}
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
