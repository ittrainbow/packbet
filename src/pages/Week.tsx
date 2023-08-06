import { useEffect, useState, useMemo } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { auth } from '../db'
import { objectCompare, ansHelper } from '../helpers'
import { YesNoButtons, OtherUser, Button, Kickoff, Switch } from '../UI'
import { i18n } from '../locale'
import { SUBMIT_RESULTS, SUBMIT_ANSWERS } from '../redux/storetypes'
import { LocaleType, YesNoHandlerPropsType } from '../types'
import { selectAnswers, selectApp, selectCompare, selectResults, selectUser, selectWeeks } from '../redux/selectors'
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
    if (answers[uid] && !!Object.keys(answers).length && !!Object.keys(results).length) {
      const userChanges = !objectCompare(answers[uid], compare.answers)
      const adminChanges = admin ? !objectCompare(results, compare.results) : false
      return !admin || adminAsPlayer ? userChanges : adminChanges
    }
    // eslint-disable-next-line
  }, [adminAsPlayer, answers, results, selectedWeek])

  const outdated = () => new Date().getTime() > deadline
  const writeAllowed = () => adm || (!adm && !outdated())

  const activity = (id: number) => {
    return ((!isItYou && outdated()) || isItYou) && ansOrResData && ansOrResData[selectedWeek]
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

      adm
        ? dispatch(resultsActions.updateResults({ results: data, selectedWeek }))
        : dispatch(answersActions.updateAnswers({ answers: data, uid }))
    }
  }

  const submitHandler = async () => {
    const firstData = !!Object.keys(answers[uid]).length
    const toastSuccess = () => toast.success(successMsg)
    const toastFailure = () => toast.error(failureMsg)
    const toaster = (success: boolean) => (success ? toastSuccess() : toastFailure())

    const type = adm ? SUBMIT_RESULTS : SUBMIT_ANSWERS
    const payload = adm ? { selectedWeek, results, toaster } : { selectedWeek, answers, uid, toaster, firstData }
    dispatch({ type, payload })
  }

  const discardHandler = () => {
    dispatch(answersActions.updateAnswers({ answers: compare.answers, uid }))
    admin && dispatch(resultsActions.updateResults({ results: compare.results, selectedWeek }))
  }

  const questionStyle = (id: number) => {
    const styles = ['question']
    const { ans, res } = ansHelper(answers, results, selectedWeek, uid, id)
    const drawResult = res && adminAsPlayer && outdated()
    if (drawResult) {
      ans && styles.push(res === ans ? 'question__green' : 'question__red')
      // !ans && styles.push('question__grey')
    }
    return styles.join(' ')
  }

  const adminPlayerHandler = () => {
    dispatch(userActions.setAdminAsPlayer(!adminAsPlayer))
  }

  const { buttonChangesMsg, buttonSaveMsg, buttonCancelMsg } = i18n(locale, 'buttons') as LocaleType
  const { successMsg, failureMsg, playerMsg, adminMsg } = i18n(locale, 'week') as LocaleType

  return (
    <div className="container">
      <div className="week-header">
        <div className="week-header__name bold">{name}</div>
        {admin && isItYou ? (
          <Switch
            onChange={adminPlayerHandler}
            checked={adminAsPlayer}
            messageOn={playerMsg}
            messageOff={adminMsg}
            width={'fit-content'}
            bordered={false}
          />
        ) : null}
      </div>
      <OtherUser />
      <ToastContainer position="top-center" autoClose={2000} theme="colored" pauseOnHover={false} />
      <Kickoff />
      <div>
        {Object.keys(questions)
          .map((el) => Number(el))
          .map((id, index) => {
            const { question, total } = questions[id]
            return (
              <div key={index} className={questionStyle(id)}>
                <div className="question__desc">
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
                    gotResult={outdated() && !!results[selectedWeek]}
                  />
                </div>
              </div>
            )
          })}
      </div>
      {isItYou ? (
        <>
          <Button onClick={submitHandler} disabled={!writeAllowed() || !gotChanges || !isItYou}>
            {!gotChanges ? buttonChangesMsg : buttonSaveMsg}
          </Button>
          {!gotChanges ? null : <Button onClick={discardHandler}>{buttonCancelMsg}</Button>}
        </>
      ) : (
        ''
      )}
    </div>
  )
}
