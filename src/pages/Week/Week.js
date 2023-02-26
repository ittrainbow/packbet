import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import structuredClone from '@ungap/structured-clone'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import './Week.scss'

import { auth, db } from '../../db'
import { useAppContext } from '../../context/Context'
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
  } = useAppContext()

  const { selectedWeek, isItYou, otherUserUID } = appContext
  const { admin, adminAsPlayer, locale } = userContext
  const { name, questions, deadline } = weeksContext[selectedWeek]
  const [adm, setAdm] = useState(admin && adminAsPlayer)
  const ansOrRes = adm ? 'results' : uid

  const outdated = () => new Date().getTime() > deadline
  const writeAllowed = () => adm || (!adm && !outdated())

  const noChanges = () => {
    return objectCompare(answersContext[ansOrRes] || {}, compareContext[ansOrRes] || {})
  }

  useEffect(() => {
    setUserContext({ ...userContext, adminAsPlayer: true }) // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setUid(isItYou ? (user ? user.uid : null) : otherUserUID)
  }, [isItYou, otherUserUID, user])

  useEffect(() => {
    setAdm(admin && !adminAsPlayer)
  }, [adminAsPlayer, selectedWeek, admin])

  const activity = (id) => {
    return ((!isItYou && outdated()) || isItYou) &&
      answersContext[ansOrRes] &&
      answersContext[ansOrRes][selectedWeek]
      ? answersContext[ansOrRes][selectedWeek][id]
      : 0
  }

  const onClickHandler = (value, id, activity) => {
    if (user && writeAllowed() && isItYou) {
      const data = structuredClone(answersContext)
      if (!data[ansOrRes]) data[ansOrRes] = {}
      if (!data[ansOrRes][selectedWeek]) data[ansOrRes][selectedWeek] = {}

      const thisWeek = data[ansOrRes][selectedWeek]
      value === activity ? delete thisWeek[id] : (thisWeek[id] = value)
      if (!Object.keys(thisWeek).some((el) => el)) delete data[ansOrRes][selectedWeek]
      setAnswersContext(data)
    }
  }

  const submitHandler = async () => {
    if (isItYou) {
      try {
        dispatch(setLoading(true))
        const data = adminAsPlayer ? answersContext[uid] : answersContext.results
        const submit = true
        const showToast = async () => {
          const response = await getDoc(doc(db, 'answers', ansOrRes))
          objectCompare(response.data(), data, submit)
            ? toast.success(successMsg)
            : toast.error(failureMsg)
          dispatch(setLoading(false))
        }
        const deleteWeek = async () =>
          await deleteDoc(doc(db, 'answers', ansOrRes)).then(() => showToast())
        const setWeek = async () =>
          await setDoc(doc(db, 'answers', ansOrRes), data).then(() => showToast())

        !data[selectedWeek] ? deleteWeek() : setWeek()
      } catch (error) {
        console.error(error)
      } finally {
        setUserContext({ ...userContext, adminAsPlayer: true })
        setCompareContext(structuredClone(answersContext))

      }
    }
  }

  const questionStyle = (id) => {
    const styles = ['question']
    if (user) {
      const { ans, res } = ansHelper(answersContext, selectedWeek, uid, id)
      const styling = res && ans && adminAsPlayer && outdated()
      styling && styles.push(res === ans ? 'question__green' : 'question__red')
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
