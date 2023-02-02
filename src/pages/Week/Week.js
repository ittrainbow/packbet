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
import { YesNoButtons, AdminPlayer, OtherUser, Button } from '../../UI'
import { setLoading } from '../../redux/actions'

export const Week = () => {
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const [adm, setAdm] = useState(true)
  const [uid, setUid] = useState(user.uid)
  const [ans, setAns] = useState()

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
  const { selectedWeek, isItYou, otherUserUID } = appContext
  const { admin, adminAsPlayer } = userContext
  const { name, questions, deadline } = weeksContext[selectedWeek]

  const res = answersContext.results[selectedWeek] || {}

  const setAnswers = () => {
    const data = user && answersContext[uid] ? answersContext[uid][selectedWeek] : null
    setAns(data || {})
  }

  const noChanges = objectCompare(answersContext, compareContext)

  useEffect(() => {
    setAnswers()
    setUserContext({ ...userContext, adminAsPlayer: true }) // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setUid(isItYou ? user.uid : otherUserUID) // eslint-disable-next-line
  }, [isItYou, otherUserUID])

  useEffect(() => {
    setAnswers() // eslint-disable-next-line
  }, [uid, answersContext])

  useEffect(() => {
    setAdm(admin && !adminAsPlayer) // eslint-disable-next-line
  }, [adminAsPlayer, selectedWeek])

  const outdated = () => new Date().getTime() < deadline

  const writeAllowed = () => {
    return adm || (!adm && outdated)
  }

  const onClickHandler = (value, id, act) => {
    if (user && writeAllowed() && isItYou) {
      const { uid } = user
      let answer = { ...ans }
      let result = { ...res }
      let context = { ...answersContext }

      if (!context[uid]) context[uid] = {}

      if (value !== act) {
        adm ? (result[id] = value) : (answer[id] = value)
      }

      if (value === act) {
        adm ? (result = objectTrim(result, id)) : (answer = objectTrim(answer, id))
      }

      const data = Object.keys(adm ? result : answer).length !== 0 ? (adm ? result : answer) : null

      if (adm) setResultsContext(data)

      if (!adm) {
        context[uid][selectedWeek] = data
        setAnswersContext(context)
      }
    }
  }

  const activity = (id) => {
    if ((!isItYou && !outdated()) || isItYou)
      return adminAsPlayer ? (ans ? ans[id] : 0) : res ? res[id] : 0
  }

  const submitHandler = async () => {
    if (isItYou) {
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
  }

  const questionStyle = (id) => {
    const styles = ['question']
    if (user) {
      const { ans, res } = ansHelper(answersContext, selectedWeek, uid, id)

      if (res && ans && adminAsPlayer && !outdated())
        res === ans ? styles.push('question__green') : styles.push('question__red')
    }

    return styles.join(' ')
  }

  return (
    <div className="container">
      <div className="week-header">
        <div className="week-header__name h3">{name}</div>
        {admin ? (
          <div className="question__admplayer">
            <div className="question__actions">{adminAsPlayer ? 'Игрок' : 'Админ'}</div>
            <div className="question__actions">{admin ? <AdminPlayer /> : null}</div>
          </div>
        ) : null}
      </div>
      <OtherUser />
      <ToastContainer position="top-center" autoClose={2000} theme="colored" pauseOnHover={false} />
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
                  admin={admin && !adminAsPlayer}
                  onClick={(value, id, activity) => onClickHandler(value, id, activity)}
                />
              </div>
            </div>
          )
        })}
      </div>
      <Button
        onClick={() => submitHandler()}
        disabled={!writeAllowed() || noChanges || !isItYou}
      >
        {noChanges ? 'Нет изменений' : 'Сохранить изменения'}
      </Button>
    </div>
  )
}
