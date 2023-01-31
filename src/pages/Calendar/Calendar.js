import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Calendar.scss'
import { Context } from '../../App'

export const Calendar = () => {
  const navigate = useNavigate()
  const { editor } = useSelector((state) => state)
  const { weeksContext, appContext, setAppContext, setEditorContext } = useContext(Context)

  const clickHandler = (selectedWeek) => {
    setAppContext({ ...appContext, selectedWeek })
    if (editor) {
      setEditorContext(weeksContext[selectedWeek])
      navigate('/editor')
    } else {
      navigate('/week')
    }
  }

  function renderWeeks() {
    return Object.keys(weeksContext)
      .sort((a, b) => b - a)
      .filter((el) => (weeksContext[el].active || editor ? el : null))
      .map((el, index) => {
        return (
          <div key={index} className="week" onClick={() => clickHandler(Number(el))}>
            {weeksContext[el].name}
          </div>
        )
      })
  }

  return (
    <div className="container">
      <h3>{editor ? 'Редактор' : 'Календарь'}</h3>
      <div className="weeklist">{renderWeeks()}</div>
    </div>
  )
}
