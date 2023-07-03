import { useEffect, useState, useMemo } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { auth } from '../db'
import { useAppContext } from '../context/Context'
import { objectCompare, ansHelper } from '../helpers'
import { YesNoButtons, AdminPlayer, OtherUser, Button, KickoffCountdown } from '../UI'
import { i18n } from '../locale/locale'
import { SUBMIT_WEEK } from '../redux/types'
import { Answers, LocaleType } from '../types'

export const Week = () => {
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const { appContext, weeksContext, userContext, setUserContext } = useAppContext()
  const { answersContext, setAnswersContext, compareContext, setCompareContext } = useAppContext()
  const { selectedWeek, isItYou, otherUserUID, season } = appContext
  const { name, questions, deadline } = weeksContext[selectedWeek]
  const { admin, adminAsPlayer, locale } = userContext
  const [uid, setUid] = useState<string>('')
  const [adm, setAdm] = useState<boolean>(false)
  const [noChanges, setNoChanges] = useState<boolean>(true)

  const ansOrRes = useMemo(() => {
    return adm ? 'results' : uid
  }, [adm, uid])

  useEffect(() => {
    if (user) {
      if (isItYou) setUid(user.uid)
      else setUid(otherUserUID)
    }
    if (admin) setAdm(adminAsPlayer)
  }, [user, admin, isItYou, otherUserUID, adminAsPlayer])

  useEffect(() => {
    setAdm(admin && !adminAsPlayer)
  }, [adminAsPlayer, selectedWeek, admin])

  const checkChanges = (data: Answers) =>
    setNoChanges(objectCompare(data, compareContext[ansOrRes]))

  const outdated = () => new Date().getTime() > deadline

  const writeAllowed = () => adm || (!adm && !outdated())

  const activity = (id: number) => {
    return ((!isItYou && outdated()) || isItYou) &&
      answersContext[ansOrRes] &&
      answersContext[ansOrRes][selectedWeek]
      ? answersContext[ansOrRes][selectedWeek][id]
      : 0
  }

  const onClickHandler = (value: number, id: number, activity: number) => {
    if (user && writeAllowed() && isItYou) {
      const data = structuredClone(answersContext)
      if (!data[ansOrRes]) data[ansOrRes] = {}
      if (!data[ansOrRes][selectedWeek]) data[ansOrRes][selectedWeek] = {}

      const thisWeek = data[ansOrRes][selectedWeek]
      value === activity ? delete thisWeek[id] : (thisWeek[id] = value)
      if (!Object.keys(thisWeek).some((el) => el)) delete data[ansOrRes][selectedWeek]

      setAnswersContext(data)
      checkChanges(data[ansOrRes])
    }
  }

  const submitHandler = async () => {
    if (isItYou) {
      const data = adminAsPlayer ? answersContext[uid] : answersContext.results

      const toastSuccess = () => toast.success(successMsg)
      const toastFailure = () => toast.error(failureMsg)
      const toaster = (success: boolean) => (success ? toastSuccess() : toastFailure())

      dispatch({ type: SUBMIT_WEEK, payload: { data, selectedWeek, season, ansOrRes, toaster } })
      setUserContext({ ...userContext, adminAsPlayer: true })
      setCompareContext(structuredClone(answersContext))
    }
  }

  const discardHandler = () => {
    setAnswersContext(compareContext)
    setNoChanges(true)
  }

  const questionStyle = (id: number) => {
    const styles = ['question']
    if (user) {
      const { ans, res } = ansHelper(answersContext, selectedWeek, uid, id)
      const styling = res && ans && adminAsPlayer && outdated()
      styling && styles.push(res === ans ? 'question__green' : 'question__red')
    }
    return styles.join(' ')
  }

  const qWidth = document.querySelector('.question') as HTMLElement
  const width = qWidth?.offsetWidth - 130 || 270

  const { buttonChangesMsg, buttonSaveMsg, buttonCancelMsg } = i18n(locale, 'buttons') as LocaleType
  const { successMsg, failureMsg } = i18n(locale, 'week') as LocaleType

  return (
    <div className="container">
      <div className="week-header">
        <div className="week-header__name bold">{name}</div>
        {admin ? <AdminPlayer /> : null}
      </div>
      <OtherUser />
      <ToastContainer position="top-center" autoClose={2000} theme="colored" pauseOnHover={false} />
      <KickoffCountdown />
      <div>
        {Object.keys(questions)
          .map((el) => Number(el))
          .map((id, index) => {
            const { question, total } = questions[id]
            return (
              <div key={index} className={questionStyle(id)}>
                <div className="question__desc" style={{ width }}>
                  {question}
                  {total !== '1' ? `: ${total}` : null}
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
      {noChanges ? null : <Button onClick={discardHandler}>{buttonCancelMsg}</Button>}
    </div>
  )
}
