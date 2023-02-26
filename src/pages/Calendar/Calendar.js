import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Calendar.scss'

import { OtherUser } from '../../UI'
import { useAppContext } from '../../context/Context'

export const Calendar = () => {
  const navigate = useNavigate()
  const { editor } = useSelector((state) => state)
  const { weeksContext, appContext, setAppContext, setEditorContext } = useAppContext()
  const { isItYou } = appContext

  const clickHandler = (selectedWeek) => {
    setAppContext({ ...appContext, selectedWeek })
    const setEditor = () => {
      setEditorContext(weeksContext[selectedWeek])
      navigate('/editor')
    }
    editor ? setEditor() : navigate('/week')
  }

  return (
    <div className="container">
      {!isItYou && !editor ? <OtherUser /> : null}
      <div className="weeklist">
        {Object.keys(weeksContext)
          .sort((a, b) => b - a)
          .filter((el) => (weeksContext[el].active || editor ? el : null))
          .map((el, index) => {
            return (
              <div key={index} className="week" onClick={() => clickHandler(Number(el))}>
                <div className="week__desc">{weeksContext[el].name}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
