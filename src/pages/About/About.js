import React, { useState, useContext } from 'react'

import './About.scss'

import { Context } from '../../App'
import { Button } from '../../UI'
import { aboutLegend } from '../../templates/_about'

export const About = () => {
  const [open, setOpen] = useState(false)
  const { about } = useContext(Context)

  return (
    <div className="container">
      <div className="paragraph">
        Каждую неделю до конца сезона мы будем представлять вашему вниманию прогнозы по "тоталам" на
        игры Пэкерз. Вам нужно будет угадать, произойдет ли то или иное событие.
      </div>
      <Button onClick={() => setOpen(!open)}>Об игре</Button>
      <div>
        {open ? (
          <>
            {about.map((el, index) => (
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
              Обратная связь - <a href="https://t.me/ittrainbow">Андрей</a>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
