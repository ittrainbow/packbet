import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getDoc, setDoc, doc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'

import './Week.scss'

import { auth, db } from '../../db'
import { Context } from '../../App'
import { compareObj } from '../../helpers'
import { Button, YesNoButtons } from '../../UI'
import { setLoading } from '../../redux/actions'

export const Week = () => {
  const [user] = useAuthState(auth)
  const { uid } = auth.currentUser
  const dispatch = useDispatch()
  const { appContext, weeksContext, answersContext, setAnswersContext } = useContext(Context)
  const { selectedWeek } = appContext
  const { number, name, questions } = weeksContext[selectedWeek]

  const onClickHandler = (value, id, activity) => {
    const ans = { ...answersContext[uid][selectedWeek] }
    const contxt = { ...answersContext }

    ans[id] = value === activity ? 0 : value
    contxt[uid][selectedWeek] = ans
    setAnswersContext(contxt)
  }

  const activity = (id) => {
    const act = answersContext[uid] ? answersContext[uid][selectedWeek] : null
    return act ? act[id] : 0
  }

  const submitHandler = async () => {
    try {
      const { uid } = user
      dispatch(setLoading(true))
      const data = {...answersContext[uid]}
      await setDoc(doc(db, 'answers', uid), data).then(async () => {
        const response = await getDoc(doc(db, 'answers', uid))
        if (compareObj(response.data(), data)) alert('Результат сохранен')
      })

      dispatch(setLoading(false))
    } catch (error) {
      alert('Произошла ошибка')
      console.error(error)
    }
  }

  return (
    <div className="container">
      <h3>
        Неделя {number}: {name}
      </h3>
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
                  activity={activity(id)}
                  disabled={!user}
                  onClick={(value, id, activity) => onClickHandler(value, id, activity)}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div>
        <Button onClick={() => submitHandler()}>Сохранить ответы</Button>
      </div>
    </div>
  )
}
