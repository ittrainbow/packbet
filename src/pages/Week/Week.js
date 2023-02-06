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
  const [adm, setAdm] = useState(admin && adminAsPlayer)

  const noChanges = () => {
    return objectCompare(answersContext, compareContext)
  }

  const outdated = () => {
    return new Date().getTime() < deadline
  }

  const writeAllowed = () => {
    return adm || (!adm && outdated())
  }

  const ansOrRes = adm ? 'results' : uid

  useEffect(() => {
    setUserContext({ ...userContext, adminAsPlayer: true }) // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setUid(isItYou ? (user ? user.uid : null) : otherUserUID)
  }, [isItYou, otherUserUID, user])

  useEffect(() => {
    setAdm(admin && !adminAsPlayer)
  }, [adminAsPlayer, selectedWeek, admin])

  const onClickHandler = (value, id, activity) => {
    if (user && writeAllowed() && isItYou) {
      const data = structuredClone(answersContext)

      if (!data[uid]) data[uid] = {}
      if (!data[uid][selectedWeek]) data[uid][selectedWeek] = {}

      const modifyData = data[ansOrRes][selectedWeek]
      value === activity ? delete modifyData[id] : (modifyData[id] = value)
      setAnswersContext(data)
    }
  }

  const activity = (id) => {
    if ((!isItYou && !outdated()) || isItYou) {
      return answersContext[uid] && answersContext[uid][selectedWeek]
        ? answersContext[uid][selectedWeek][id]
        : 0
    }
  }

  const submitHandler = async () => {
    if (isItYou) {
      dispatch(setLoading(true))
      try {
        const data = adminAsPlayer ? answersContext[uid] : answersContext.results
        if (Object.keys(data[selectedWeek]).length === 0) delete data[selectedWeek]
        await setDoc(doc(db, 'answers', ansOrRes), data).then(async () => {
          const response = await getDoc(doc(db, 'answers', ansOrRes))
          if (objectCompare(response.data(), data)) toast.success(successMsg)
          else toast.error(failureMsg)
        })
      } catch (error) {
        console.error(error)
      }
      setUserContext({ ...userContext, adminAsPlayer: true })
      setCompareContext(structuredClone(answersContext))

      dispatch(setLoading(false))
    }
  }

  const questionStyle = (id) => {
    const styles = ['question']
    if (user) {
      const { ans, res } = ansHelper(answersContext, selectedWeek, uid, id)
      const styling = res && ans && adminAsPlayer && !outdated()
      if (styling) styles.push(res === ans ? 'question__green' : 'question__red')
    }

    return styles.join(' ')
  }

  // locale
  const { buttonChangesMsg, buttonSaveMsg } = i18n(locale, 'buttons')
  const { playerMsg, adminMsg, successMsg, failureMsg } = i18n(locale, 'week')

  return (
    <div className="container">
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
      <Button onClick={submitHandler} disabled={!writeAllowed() || noChanges() || !isItYou}>
        {noChanges() ? buttonChangesMsg : buttonSaveMsg}
      </Button>
    </div>
  )
}
