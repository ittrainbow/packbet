import React, { useContext } from 'react'

import './Calendar.scss'
import { Context } from '../../App'

export const Calendar = () => {
  const { weeksContext } = useContext(Context)

  return (
    <div className="container">
      <div className="weeklist">
        {weeksContext.map((el) => {
          return (
            <div key={el.number} className="week">
              Неделя {el.number}: {el.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}
