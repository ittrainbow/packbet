import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import './Week.scss'

import { auth } from '../../db'
import { Context } from '../../App'
import { getLastWeek } from '../../helpers'
import { YesNoButtons } from '../../UI'

export const Week = () => {
  const [user] = useAuthState(auth)
  const { weeksContext, gamedayContext, setGamedayContext } = useContext(Context)
  const { number, name, questions } = getLastWeek(weeksContext)

  const onClickHandler = (value, id, activity) => {
    const copy = { ...gamedayContext }
    copy[id] = value === activity ? 0 : value
    setGamedayContext(copy)
  }

  const renderWeek = () => {
    return (
      <div>
        {Object.keys(questions).map((el) => {
          const id = Number(el)
          const { question, total } = questions[el]
          return (
            <div key={el} className="question">
              <div className="question__desc">
                {question}: {total}
              </div>

              <div className="question__actions">
                <YesNoButtons
                  total={total}
                  id={id}
                  activity={gamedayContext[id]}
                  disabled={!user}
                  onClick={(value, id, activity) => onClickHandler(value, id, activity)}
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="container">
      <h3>
        Неделя {number}: {name}
      </h3>
      {renderWeek()}
    </div>
  )
}
