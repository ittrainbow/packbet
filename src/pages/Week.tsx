import { useEffect, useRef, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { AnswersType, IStore, LocaleType, YesNoHandlePropsType } from '../types'
import { ansHelper, animateCancel, weekGotChanges, weekAnimate } from '../helpers'
import { YesNoButtons, OtherUser, Button, Kickoff, Switch, WeekRow } from '../UI'
import { answersActions, resultsActions, userActions } from '../redux/slices'
import { selectApp, selectUser } from '../redux/selectors'
import * as TYPES from '../redux/storetypes'
import { i18n } from '../locale'

export const Week = () => {
  const dispatch = useDispatch()
  const { selectedWeek, isItYou, tabActive } = useSelector(selectApp)
  const { admin, adminAsPlayer, locale, uid } = useSelector(selectUser)
  const answers = useSelector((store: IStore) => store.answers)
  const results = useSelector((store: IStore) => store.results)
  const weeks = useSelector((store: IStore) => store.weeks)
  const compare = useSelector((store: IStore) => store.compare)
  const containerRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef<HTMLDivElement>(null)
  const [drawCancel, setDrawCancel] = useState<boolean>(false)
  const { name, questions, deadline } = weeks[selectedWeek]

  // container fade animations

  const gotChanges = weekGotChanges()

  useEffect(() => {
    weekAnimate(containerRef)
  }, [tabActive])

  useEffect(() => {
    animateCancel(drawCancel, weekGotChanges(), cancelRef, setDrawCancel)
  }, [gotChanges, drawCancel])

  // helpers

  const adm = useMemo(() => admin && !adminAsPlayer, [admin, adminAsPlayer])
  const outdated = () => new Date().getTime() > deadline
  const writeAllowed = adm || (!adm && !outdated())
  const ansOrResData = adm ? results : answers[uid]

  // click action handlers

  const handleClickAdmin = (data: AnswersType) => {
    dispatch(resultsActions.updateResults({ results: data, selectedWeek }))
  }

  const handleClickUser = (data: AnswersType) => {
    dispatch(answersActions.updateAnswers({ answers: data, uid }))
  }

  const handleClick = (props: YesNoHandlePropsType) => {
    if (writeAllowed && isItYou) {
      const { value, id, activity } = props
      const data = structuredClone(ansOrResData) || {}
      if (!data[selectedWeek]) data[selectedWeek] = {}
      if (value === activity) {
        if (Object.keys(data[selectedWeek]).length === 1) {
          delete data[selectedWeek]
        } else {
          delete data[selectedWeek][id]
        }
      } else {
        data[selectedWeek][id] = value
      }

      adm ? handleClickAdmin(data) : handleClickUser(data)
    }
  }

  const handleSubmit = async () => {
    const firstData = !!Object.keys(answers[uid]).length
    const toastSuccess = () => toast.success(successMsg)
    const toastFailure = () => toast.error(failureMsg)
    const toaster = (success: boolean) => (success ? toastSuccess() : toastFailure())
    const type = adm ? TYPES.SUBMIT_RESULTS : TYPES.SUBMIT_ANSWERS
    const payload = adm ? { selectedWeek, results, toaster } : { selectedWeek, answers, uid, toaster, firstData }

    dispatch({ type, payload })
  }

  const handleDiscard = () => {
    dispatch(answersActions.updateAnswers({ answers: compare.answers, uid }))
    admin && dispatch(resultsActions.updateResults({ results: compare.results, selectedWeek }))
  }

  const handleAdminAsPlayer = () => {
    dispatch(userActions.setAdminAsPlayer(!adminAsPlayer))
  }

  // render styles and locales

  const getQuestionStyle = (id: number) => {
    const styles = ['question']
    const { ans, res } = ansHelper(answers, results, selectedWeek, uid, id)
    const drawResult = res && (adminAsPlayer || !admin) && outdated()
    drawResult && ans && styles.push(res === ans ? 'question__green' : 'question__red')

    return styles.join(' ')
  }

  const getActivity = (id: number) => {
    return ((!isItYou && outdated()) || isItYou) && ansOrResData && ansOrResData[selectedWeek]
      ? ansOrResData[selectedWeek][id]
      : 0
  }

  const { buttonChangesMsg, buttonSaveMsg, buttonCancelMsg } = i18n(locale, 'buttons') as LocaleType
  const { successMsg, failureMsg, playerMsg, adminMsg } = i18n(locale, 'week') as LocaleType

  // render

  return (
    <div className="container animate-fade-in-up" ref={containerRef}>
      <div className="week-header">
        <div className="week-header__name bold">{name}</div>
        {admin && isItYou ? (
          <Switch onChange={handleAdminAsPlayer} checked={adminAsPlayer} messageOn={playerMsg} messageOff={adminMsg} />
        ) : null}
      </div>
      <OtherUser containerRef={containerRef} />
      <ToastContainer position="top-center" autoClose={2000} theme="colored" pauseOnHover={false} />
      <Kickoff />
      {Object.keys(questions)
        .map((el) => Number(el))
        .map((id, index) => {
          const { question, total } = questions[id]
          return (
            <div key={index}>
              <WeekRow id={id} />
              <div className={getQuestionStyle(id)}>
                <div className="question__desc">
                  {question} {total !== '1' ? `: ${total}` : null}
                </div>
                <div className="question__actions">
                  <YesNoButtons
                    total={total}
                    id={id}
                    activity={getActivity(id)}
                    admin={admin && !adminAsPlayer}
                    onClick={handleClick}
                    gotResult={outdated() && !!results[selectedWeek]}
                  />
                </div>
              </div>
            </div>
          )
        })}
      <>
        <Button onClick={handleSubmit} disabled={!weekGotChanges()}>
          {!weekGotChanges() ? buttonChangesMsg : buttonSaveMsg}
        </Button>
        {drawCancel ? (
          <div className="animate-fade-in-up" ref={cancelRef}>
            <Button onClick={handleDiscard}>{buttonCancelMsg}</Button>
          </div>
        ) : null}
      </>
    </div>
  )
}
