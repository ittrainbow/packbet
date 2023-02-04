import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Calendar.scss'

import { Context } from '../../App'
import { OtherUser } from '../../UI'

export const Calendar = () => {
  const navigate = useNavigate()
  const { editor } = useSelector((state) => state)
  const { weeksContext, appContext, setAppContext, setEditorContext } = useContext(Context)
  const { isItYou } = appContext

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
            <div className="week__desc">{weeksContext[el].name}</div>
          </div>
        )
      })
  }

  return (
    <div className="container">
      {!isItYou && !editor ? <OtherUser /> : null}
      <div className="weeklist">{renderWeeks()}</div>
    </div>
  )
}
