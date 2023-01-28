import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Calendar.scss'
import { Context } from '../../App'

export const Calendar = () => {
  const navigate = useNavigate()
  const { editor } = useSelector((state) => state)
  const { weeksContext, appContext, setAppContext } = useContext(Context)

  const clickHandler = (selectedWeek) => {
    setAppContext({
      ...appContext,
      selectedWeek
    })
    navigate(editor ? '/editor' : '/week')
  }

  return (
    <div className="container">
      <h3>{editor ? 'Редактор' : 'Календарь'}</h3>
      <div className="weeklist">
        {Object.keys(weeksContext)
          .sort((a, b) => b - a)
          .map((el, index) => {
            return (
              <div key={index} className="week" onClick={() => clickHandler(Number(el))}>
                {weeksContext[el].name}
              </div>
            )
          })}
      </div>
    </div>
  )
}
