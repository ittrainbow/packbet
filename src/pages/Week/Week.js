import React, { useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getDoc, setDoc, doc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import Countdown from 'react-countdown'
import structuredClone from '@ungap/structured-clone'
import { ToastContainer, toast } from 'react-toastify'

import './Week.scss'

import { auth, db } from '../../db'
import { Context } from '../../App'
import { objectCompare, ansHelper, objectTrim, renderer } from '../../helpers'
import { YesNoButtons, AdminPlayer, OtherUser } from '../../UI'
import { setLoading } from '../../redux/actions'

export const Week = () => {
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const [thisWeek, setThisWeek] = useState()
  const [adm, setAdm] = useState(true)

  const {
    appContext,
    weeksContext,
    userContext,
    setUserContext,
    answersContext,
    setAnswersContext,
    compareContext,
    setCompareContext,
    setResultsContext
  } = useContext(Context)
  const { selectedWeek, isItYou } = appContext
  const { admin, adminAsPlayer } = userContext
  const { name, questions, deadline } = weeksContext[selectedWeek]

  const ans = user && answersContext[user.uid] ? answersContext[user.uid][selectedWeek] : {}
  const res = answersContext.results[selectedWeek] || {}

  const weekDispatch = (value) => {
    const data = value ? value : admin && !adminAsPlayer ? res : ans
    setThisWeek(data || {})
  }

  useEffect(() => {
    setUserContext({ ...userContext, adminAsPlayer: false })
    weekDispatch() // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setAdm(admin && !adminAsPlayer)
    weekDispatch() // eslint-disable-next-line
  }, [adminAsPlayer, selectedWeek])

  const noChanges = objectCompare(answersContext, compareContext)

  const writeAllowed = () => {
    return adm || (!adm && new Date().getTime() < deadline)
  }

  const onClickHandler = (value, id, activity) => {
    if (user && writeAllowed() && isItYou) {
      const { uid } = user
      let answer = { ...thisWeek }
      let context = { ...answersContext }

      if (!context[uid]) context[uid] = {}
      if (value !== activity) answer[id] = value
      if (value === activity) answer = objectTrim(answer, id)

      const ans = Object.keys(answer).length !== 0 ? answer : null

      if (adm) {
        setResultsContext(ans)
      }

      if (!adm) {
        context[uid][selectedWeek] = ans
        setAnswersContext(context)
      }

      weekDispatch(answer)
    }
  }

  const activity = (id) => {
    return thisWeek ? thisWeek[id] : 0
  }

  const submitHandler = async () => {
    dispatch(setLoading(true))
    try {
      const { uid } = user
      const data = adminAsPlayer ? answersContext[uid] : answersContext.results
      const link = adm ? 'results' : uid
      await setDoc(doc(db, 'answers', link), data).then(async () => {
        const response = await getDoc(doc(db, 'answers', link))
        if (objectCompare(response.data(), data)) toast.success('Данные сохранены')
        else toast.error('Произошла ошибка')
      })
    } catch (error) {
      alert('Произошла ошибка')
      console.error(error)
    }
    setUserContext({ ...userContext, adminAsPlayer: false })
    setCompareContext(structuredClone(answersContext))
    dispatch(setLoading(false))
  }

  const questionStyle = (id) => {
    const styles = ['question']
    if (user) {
      const { ans, res } = ansHelper(answersContext, selectedWeek, user.uid, id)

      if (res && ans && adminAsPlayer)
        res === ans ? styles.push('question__green') : styles.push('question__red')
    }

    return styles.join(' ')
  }

  return (
    <div className="container">
      <div className="week-header">
        <div className="week-header__name">{name}</div>
        {admin ? (
          <div className="question__admplayer">
            <div className="question__actions">{adminAsPlayer ? 'player' : 'admin'}</div>
            <div className="question__actions">{admin ? <AdminPlayer /> : null}</div>
          </div>
        ) : null}
      </div>
      <OtherUser />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
      />
      <Countdown date={deadline} renderer={renderer} />
      <div>
        {Object.keys(questions).map((el) => {
          const id = Number(el)
          const { question, total } = questions[el]
          return (
            <div key={el} className={questionStyle(id)}>
              <div className="question__desc">
                {question}
                {total !== 1 ? `: ${total}` : null}
              </div>
              <div className="question__actions">
                <YesNoButtons
                  total={total}
                  id={id}
                  activity={activity(id)}
                  admin={admin}
                  adminAsPlayer={adminAsPlayer}
                  onClick={(value, id, activity) => onClickHandler(value, id, activity)}
                />
              </div>
            </div>
          )
        })}
      </div>
      <button
        className="btn"
        onClick={() => submitHandler()}
        disabled={!writeAllowed() || noChanges}
      >
        {noChanges ? 'Нет изменений' : 'Сохранить ответы'}
      </button>
    </div>
  )
}
