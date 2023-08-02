import { useEffect, useState, useMemo } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { auth } from '../db'
import { objectCompare, ansHelper } from '../helpers'
import { YesNoButtons, AdminPlayer, OtherUser, Button, Kickoff } from '../UI'
import { i18n } from '../locale/locale'
import { SUBMIT_RESULTS, SUBMIT_ANSWERS } from '../redux/storetypes'
import { LocaleType, YesNoHandlerPropsType } from '../types'
import {
  selectAnswers,
  selectApp,
  selectCompare,
  selectResults,
  selectUser,
  selectWeeks
} from '../redux/selectors'
import { answersActions, resultsActions, userActions } from '../redux/slices'

export const Week = () => {
  const { selectedWeek, isItYou, otherUserUID } = useSelector(selectApp)
  const { admin, adminAsPlayer, locale } = useSelector(selectUser)
  const answers = useSelector(selectAnswers)
  const results = useSelector(selectResults)
  const weeks = useSelector(selectWeeks)
  const compare = useSelector(selectCompare)

  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const { name, questions, deadline } = weeks[selectedWeek]
  const [uid, setUid] = useState<string>('')

  const adm = useMemo(() => {
    return admin && !adminAsPlayer
  }, [admin, adminAsPlayer])

  const ansOrResData = adm ? results : answers[uid]

  useEffect(() => {
    if (user) isItYou ? setUid(user.uid) : setUid(otherUserUID)
  }, [user, admin, isItYou, otherUserUID, adminAsPlayer])

  const gotChanges = useMemo(() => {
    if (!!Object.keys(answers).length && !!Object.keys(results).length) {
      const userChanges = !objectCompare(answers[uid], compare.answers)
      const adminChanges = admin
        ? !objectCompare(results, compare.results)
        : false

      return userChanges || adminChanges
    }
  }, [adminAsPlayer, answers, results])

  const outdated = () => {
    return new Date().getTime() > deadline
  }

  const writeAllowed = () => {
    return adm || (!adm && !outdated())
  }

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

      if (adm) dispatch(resultsActions.setResults(data))
      else dispatch(answersActions.updateAnswers({ answers: data, uid }))

      // checkChanges(data)
    }
  }

  const submitHandler = async () => {
    const firstData = !!Object.keys(answers[uid]).length
    const toastSuccess = () => toast.success(successMsg)
    const toastFailure = () => toast.error(failureMsg)
    const toaster = (success: boolean) =>
      success ? toastSuccess() : toastFailure()

    dispatch(userActions.setAdminAsPlayer(true))

    if (adm) {
      dispatch({ type: SUBMIT_RESULTS, payload: { results, toaster } })
    } else {
      dispatch({
        type: SUBMIT_ANSWERS,
        payload: { selectedWeek, answers, uid, toaster, firstData }
      })
    }
  }

  const discardHandler = () => {
    dispatch(answersActions.updateAnswers({ answers: compare.answers, uid }))
    admin && dispatch(resultsActions.setResults(compare.results))
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
        {admin && isItYou ? <AdminPlayer /> : null}
      </div>
      <OtherUser />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
        pauseOnHover={false}
      />
      <Kickoff />
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
      {isItYou ? (
        <>
          <Button
            onClick={submitHandler}
            disabled={!writeAllowed() || !gotChanges || !isItYou}
          >
            {!gotChanges ? buttonChangesMsg : buttonSaveMsg}
          </Button>
          {!gotChanges ? null : (
            <Button onClick={discardHandler}>{buttonCancelMsg}</Button>
          )}
        </>
      ) : (
        ''
      )}
    </div>
  )
}
