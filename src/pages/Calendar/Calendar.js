import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Calendar.scss'

import { OtherUser } from '../../UI'
import { useAppContext } from '../../context/Context'

export const Calendar = () => {
  const navigate = useNavigate()
  const { editor } = useSelector((state) => state.app)
  const { weeksContext, appContext, setAppContext, setEditorContext } = useAppContext()
  const { isItYou } = appContext

  const clickHandler = ({ selectedWeek, num }) => {
    setAppContext({ ...appContext, selectedWeek })
    const setEditor = () => {
      setEditorContext(weeksContext[selectedWeek])
      navigate(`/editor/${num}`)
    }
    editor ? setEditor() : navigate(`/week/${num}`)
  }

  return (
    <div className="container">
      {!isItYou && !editor ? <OtherUser /> : null}
      <div className="weeklist">
        {Object.keys(weeksContext)
          .sort((a, b) => b - a)
          .filter((el) => (weeksContext[el].active || editor ? el : null))
          .map((el) => {
            const { name } = weeksContext[el]
            const num = name.split(':')[0].split(' ')[1]
            const selectedWeek = Number(el)
            return (
              <div key={selectedWeek} className="week" onClick={() => clickHandler({ selectedWeek, num })}>
                <div className="week__desc">{name}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
