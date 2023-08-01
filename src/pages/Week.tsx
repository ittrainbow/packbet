import { useEffect, useState, useMemo } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { auth } from '../db'
import { useAppContext } from '../context/Context'
import { objectCompare, ansHelper } from '../helpers'
import {
  YesNoButtons,
  AdminPlayer,
  OtherUser,
  Button,
  KickoffCountdown
} from '../UI'
import { i18n } from '../locale/locale'
import { SUBMIT_WEEK } from '../redux/types'
import { AnswersType, LocaleType, YesNoHandlerPropsType } from '../types'
import {
  selectAnswers,
  selectApp,
  selectResults,
  selectUser
} from '../redux/selectors'
import { userActions } from '../redux/slices/userSlice'
import { answersActions, resultsActions } from '../redux/slices'

export const Week = () => {
  const dispatch = useDispatch()
  const { selectedWeek, isItYou, otherUserUID, season } = useSelector(selectApp)
  const { admin, adminAsPlayer, locale } = useSelector(selectUser)
  const answers = useSelector(selectAnswers)
  const results = useSelector(selectResults)
  const [user] = useAuthState(auth)
  const { weeksContext } = useAppContext()
  const { compareContext, setCompareContext } = useAppContext()
  const { name, questions, deadline } = weeksContext[selectedWeek]
  const [uid, setUid] = useState<string>('')
  const [noChanges, setNoChanges] = useState<boolean>(true)

  const adm = useMemo(() => {
    return admin && !adminAsPlayer
  }, [admin, adminAsPlayer])

  const ansOrRes = adm ? 'results' : uid
  const ansOrResData = adm ? results : answers[uid]

  useEffect(() => {
    if (user) isItYou ? setUid(user.uid) : setUid(otherUserUID)
  }, [user, admin, isItYou, otherUserUID, adminAsPlayer])

  const checkChanges = (data: AnswersType) =>
    setNoChanges(objectCompare(data, compareContext[ansOrRes]))

  const outdated = () => new Date().getTime() > deadline

  const writeAllowed = () => adm || (!adm && !outdated())

  const activity = (id: number) => {
    return ((!isItYou && outdated()) || isItYou) &&
      ansOrResData &&
      ansOrResData[selectedWeek]
      ? ansOrResData[selectedWeek][id]
      : 0
  }

  const onClickHandler = (props: YesNoHandlerPropsType) => {
    const { value, id, activity } = props
    if (user && writeAllowed() && isItYou) {
      const data = structuredClone(ansOrResData) || {}
      if (!data[selectedWeek]) data[selectedWeek] = {}

      const thisWeek = data[selectedWeek]
      value === activity ? delete thisWeek[id] : (thisWeek[id] = value)
      if (!Object.keys(thisWeek).some((el) => el)) delete data[selectedWeek]

      if (adm) {
        dispatch(resultsActions.setResults(data))
      } else {
        dispatch(answersActions.updateAnswers({ answers: data, uid }))
      }
      checkChanges(data)
    }
  }

  const submitHandler = async () => {
    if (isItYou) {
      const toastSuccess = () => toast.success(successMsg)
      const toastFailure = () => toast.error(failureMsg)
      const toaster = (success: boolean) =>
        success ? toastSuccess() : toastFailure()

      dispatch({
        type: SUBMIT_WEEK,
        payload: { data: ansOrResData, selectedWeek, season, ansOrRes, toaster }
      })
      setCompareContext(structuredClone(answers))

      dispatch(userActions.setAdminAsPlayer(true))
    }
  }

  const discardHandler = () => {
    dispatch(answersActions.setAnswers(compareContext))
    setNoChanges(true)
  }

  const questionStyle = (id: number) => {
    const styles = ['question']
    if (user) {
      const { ans, res } = ansHelper(answers, results, selectedWeek, uid, id)
      const styling = res && ans && adminAsPlayer && outdated()
      styling && styles.push(res === ans ? 'question__green' : 'question__red')
    }
    return styles.join(' ')
  }

  const qWidth = document.querySelector('.question') as HTMLElement
  const width = qWidth?.offsetWidth - 130 || 270

  const { buttonChangesMsg, buttonSaveMsg, buttonCancelMsg } = i18n(
    locale,
    'buttons'
  ) as LocaleType
  const { successMsg, failureMsg } = i18n(locale, 'week') as LocaleType

  return (
    <div className="container">
      <div className="week-header">
        <div className="week-header__name bold">{name}</div>
        {admin ? <AdminPlayer /> : null}
      </div>
      <OtherUser />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
        pauseOnHover={false}
      />
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
                    onClick={onClickHandler}
                  />
                </div>
              </div>
            )
          })}
      </div>
      <Button
        onClick={submitHandler}
        disabled={!writeAllowed() || noChanges || !isItYou}
      >
        {noChanges ? buttonChangesMsg : buttonSaveMsg}
      </Button>
      {noChanges ? null : (
        <Button onClick={discardHandler}>{buttonCancelMsg}</Button>
      )}
    </div>
  )
}
