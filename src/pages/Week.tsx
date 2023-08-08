import { useEffect, useRef, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { YesNoButtons, OtherUser, Button, Kickoff, Switch } from '../UI'
import { answersActions, resultsActions, userActions } from '../redux/slices'
import { AnswersType, IStore, LocaleType, YesNoHandlerPropsType } from '../types'
import { ansHelper, fadeInOut, animateCancel, weekGotChanges } from '../helpers'
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

  useEffect(() => {
    tabActive !== 2 && fadeInOut(containerRef)
  }, [tabActive])

  useEffect(() => {
    animateCancel(drawCancel, weekGotChanges(), cancelRef, setDrawCancel) // eslint-disable-next-line
  }, [weekGotChanges()])

  const adm = useMemo(() => {
    return admin && !adminAsPlayer
  }, [admin, adminAsPlayer])

  const outdated = () => new Date().getTime() > deadline
  const writeAllowed = adm || (!adm && !outdated())
  const ansOrResData = adm ? results : answers[uid]

  const adminClickHandler = (data: AnswersType) => {
    dispatch(resultsActions.updateResults({ results: data, selectedWeek }))
  }

  const userClickHandler = (data: AnswersType) => {
    dispatch(answersActions.updateAnswers({ answers: data, uid }))
  }

  const onClickHandler = (props: YesNoHandlerPropsType) => {
    if (writeAllowed && isItYou) {
      const { value, id, activity } = props
      const data = structuredClone(ansOrResData) || {}
      if (!data[selectedWeek]) data[selectedWeek] = {}
      const thisWeek = data[selectedWeek]
      if (!Object.keys(thisWeek).some((el) => el)) delete data[selectedWeek]
      value === activity ? delete thisWeek[id] : (thisWeek[id] = value)

      adm ? adminClickHandler(data) : userClickHandler(data)
    }
  }

  const submitHandler = async () => {
    const firstData = !!Object.keys(answers[uid]).length
    const toastSuccess = () => toast.success(successMsg)
    const toastFailure = () => toast.error(failureMsg)
    const toaster = (success: boolean) => (success ? toastSuccess() : toastFailure())
    const type = adm ? TYPES.SUBMIT_RESULTS : TYPES.SUBMIT_ANSWERS
    const payload = adm ? { selectedWeek, results, toaster } : { selectedWeek, answers, uid, toaster, firstData }

    dispatch({ type, payload })
  }

  const discardHandler = () => {
    dispatch(answersActions.updateAnswers({ answers: compare.answers, uid }))
    admin && dispatch(resultsActions.updateResults({ results: compare.results, selectedWeek }))
  }

  const adminPlayerHandler = () => dispatch(userActions.setAdminAsPlayer(!adminAsPlayer))

  const questionStyle = (id: number) => {
    const styles = ['question']
    const { ans, res } = ansHelper(answers, results, selectedWeek, uid, id)
    const drawResult = res && (adminAsPlayer || !admin) && outdated()
    drawResult && ans && styles.push(res === ans ? 'question__green' : 'question__red')

    return styles.join(' ')
  }

  const activity = (id: number) => {
    return ((!isItYou && outdated()) || isItYou) && ansOrResData && ansOrResData[selectedWeek]
      ? ansOrResData[selectedWeek][id]
      : 0
  }

  const { buttonChangesMsg, buttonSaveMsg, buttonCancelMsg } = i18n(locale, 'buttons') as LocaleType
  const { successMsg, failureMsg, playerMsg, adminMsg } = i18n(locale, 'week') as LocaleType

  return (
    <div className="container animate-fade-in-up" ref={containerRef}>
      <div className="week-header">
        <div className="week-header__name bold">{name}</div>
        {admin && isItYou ? (
          <Switch onChange={adminPlayerHandler} checked={adminAsPlayer} messageOn={playerMsg} messageOff={adminMsg} />
        ) : null}
      </div>
      <OtherUser />
      <ToastContainer position="top-center" autoClose={2000} theme="colored" pauseOnHover={false} />
      <Kickoff />
      {Object.keys(questions)
        .map((el) => Number(el))
        .map((id, index) => {
          const { question, total } = questions[id]
          return (
            <div key={index} className={questionStyle(id)}>
              <div className="question__desc">
                {question} {total !== '1' ? `: ${total}` : null}
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
      <>
        <Button onClick={submitHandler} disabled={!weekGotChanges()}>
          {!weekGotChanges() ? buttonChangesMsg : buttonSaveMsg}
        </Button>
        {drawCancel ? (
          <div className="animate-fade-in-up" ref={cancelRef}>
            <Button onClick={discardHandler}>{buttonCancelMsg}</Button>
          </div>
        ) : null}
      </>
    </div>
  )
}
