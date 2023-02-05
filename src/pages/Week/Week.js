import React, { useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getDoc, setDoc, doc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import structuredClone from '@ungap/structured-clone'
import { ToastContainer, toast } from 'react-toastify'
import './Week.scss'

import { auth, db } from '../../db'
import { Context } from '../../App'
import { objectCompare, ansHelper } from '../../helpers'
import { YesNoButtons, AdminPlayer, OtherUser, Button, KickoffCountdown } from '../../UI'
import { setLoading } from '../../redux/actions'
import { i18n } from '../../locale/locale'

export const Week = () => {
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const [adm, setAdm] = useState(true)
  const [uid, setUid] = useState(user ? user.uid : null)

  const {
    appContext,
    weeksContext,
    userContext,
    setUserContext,
    answersContext,
    setAnswersContext,
    compareContext,
    setCompareContext
  } = useContext(Context)

  const { selectedWeek, isItYou, otherUserUID } = appContext
  const { admin, adminAsPlayer, locale } = userContext
  const { name, questions, deadline } = weeksContext[selectedWeek]

  const noChanges = objectCompare(answersContext, compareContext)
  const outdated = () => new Date().getTime() < deadline
  const writeAllowed = () => adm || (!adm && outdated())

  useEffect(() => {
    setUserContext({ ...userContext, adminAsPlayer: true }) // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setUid(isItYou ? (user ? user.uid : null) : otherUserUID) // eslint-disable-next-line
  }, [isItYou, otherUserUID])

  useEffect(() => {
    setAdm(admin && !adminAsPlayer) // eslint-disable-next-line
  }, [adminAsPlayer, selectedWeek])

  const onClickHandler = (value, id, activity) => {
    const ansOrRes = adm ? 'results' : uid

    if (user && writeAllowed() && isItYou) {
      const data = structuredClone(answersContext)
      const trimValue = value === activity
      const modifyData = data[ansOrRes][selectedWeek]

      trimValue ? delete modifyData[id] : (modifyData[id] = value)
      setAnswersContext(data)
    }
  }

  const activity = (id) => {
    if ((!isItYou && !outdated()) || isItYou) {
      const ansOrRes = adm ? 'results' : uid
      return answersContext[ansOrRes][selectedWeek][id]
    }
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
          if (objectCompare(response.data(), data)) toast.success(successMsg)
          else toast.error(failureMsg)
        })
      } catch (error) {
        toast.error(failureMsg)
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
  const { buttonChangesMsg, buttonSaveMsg } = i18n(locale, 'buttons')
  const { playerMsg, adminMsg, successMsg, failureMsg } = i18n(locale, 'week')

  const clicker = () => {
    console.log(answersContext)
  }

  return (
    <div className="container">
      <button onClick={clicker}>123</button>
      <div className="week-header">
        <div className="week-header__name bold">{name}</div>
        {admin ? (
          <div className="question__admplayer">
            <div className="question__actions">{adminAsPlayer ? playerMsg : adminMsg}</div>
            <div className="question__actions">{admin ? <AdminPlayer /> : null}</div>
          </div>
        ) : null}
      </div>
      <OtherUser />
      <ToastContainer position="top-center" autoClose={2000} theme="colored" pauseOnHover={false} />
      <KickoffCountdown />
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
      <Button onClick={submitHandler} disabled={!writeAllowed() || noChanges || !isItYou}>
        {noChanges ? buttonChangesMsg : buttonSaveMsg}
      </Button>
    </div>
  )
}
