import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import './Calendar.scss'
import { Context } from '../../App'

export const Calendar = () => {
  const navigate = useNavigate()
  const { weeksContext, appContext, setAppContext } = useContext(Context)

  const clickHandler = (selectedWeek) => {
    setAppContext({
      ...appContext,
      selectedWeek
    })
    navigate('/week')
  }

  return (
    <div className="container">
      <div className="weeklist">
        {Object.keys(weeksContext).map((el) => {
          const { number, name } = weeksContext[el]
          return (
            <div key={number} className="week" onClick={() => clickHandler(Number(el))}>
              Неделя {number}: {name}
            </div>
          )
        })}
      </div>
    </div>
  )
}
