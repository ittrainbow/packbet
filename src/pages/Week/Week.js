import React, { useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getDoc, setDoc, doc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'

import './Week.scss'

import { auth, db } from '../../db'
import { Context } from '../../App'
import { objectCompare, ansHelper } from '../../helpers'
import { Button, YesNoButtons } from '../../UI'
import { setLoading } from '../../redux/actions'

export const Week = () => {
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const [loadedState, setLoadedState] = useState('')

  const { appContext, userContext, weeksContext, answersContext, setAnswersContext } =
    useContext(Context)
  const { selectedWeek } = appContext
  const { admin } = userContext
  const { number, name, questions } = weeksContext[selectedWeek]

  const thisweek = user ? answersContext[user.uid][selectedWeek] : null

  useEffect(() => {
    if (user) setLoadedState(thisweek)
    // eslint-disable-next-line
  }, [])

  const anyChanges = objectCompare(thisweek, loadedState)

  const onClickHandler = (value, id, activity) => {
    const { uid } = user
    const answer = { ...thisweek }
    const context = { ...answersContext }

    if (!context[uid]) context[uid] = {}
    answer[id] = value === activity ? 0 : value
    context[uid][selectedWeek] = answer

    setAnswersContext(context)
  }

  const activity = (id) => {
    return user && thisweek ? thisweek[id] : 0
  }

  const submitHandler = async () => {
    dispatch(setLoading(true))
    try {
      const { uid } = user
      const data = { ...answersContext[uid] }
      const link = admin ? 'results' : uid
      await setDoc(doc(db, 'answers', link), data).then(async () => {
        const response = await getDoc(doc(db, 'answers', uid))
        if (objectCompare(response.data(), data)) alert('Результат сохранен')
      })
    } catch (error) {
      alert('Произошла ошибка')
      console.error(error)
    }
    dispatch(setLoading(false))
  }

  const questionStyle = (id) => {
    const styles = ['question']
    if (user) {
      const { ans, res } = ansHelper(answersContext, selectedWeek, user.uid, id)

      if (res && ans && !admin)
        res === ans ? styles.push('question__green') : styles.push('question__red')
    }

    return styles.join(' ')
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
            <div key={el} className={questionStyle(id)}>
              <div className="question__desc">
                {question}: {total}
              </div>
              <div className="question__actions">
                <YesNoButtons
                  total={total}
                  id={id}
                  activity={activity(id)}
                  admin={admin}
                  disabled={!user}
                  onClick={(value, id, activity) => onClickHandler(value, id, activity)}
                />
              </div>
            </div>
          )
        })}
      </div>
      <Button onClick={() => submitHandler()} disabled={!user || anyChanges}>
        {anyChanges ? 'Нет изменений' : 'Сохранить ответы'}
      </Button>
    </div>
  )
}
