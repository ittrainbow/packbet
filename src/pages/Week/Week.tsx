import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { animateWeekCancel, getWeekChangesStatus, animateWeekFadeOut } from '../../helpers'
import { answersActions, resultsActions, userActions } from '../../redux/slices'
import { selectApp, selectUser } from '../../redux/selectors'
import { IStore, LocaleType, WeekType } from '../../types'
import { OtherUser, Button, Switch } from '../../UI'
import { WeekQuestion, WeekCountdown } from '.'
import * as TYPES from '../../redux/storetypes'
import { i18n } from '../../locale'

export const Week = () => {
  const dispatch = useDispatch()
  const { selectedWeek, currentWeek, isItYou, tabActive, duration } = useSelector(selectApp)
  const { admin, adminAsPlayer, locale, uid } = useSelector(selectUser)
  const answers = useSelector((store: IStore) => store.answers)
  const results = useSelector((store: IStore) => store.results)
  const weeks = useSelector((store: IStore) => store.weeks)
  const compare = useSelector((store: IStore) => store.compare)
  const containerRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef<HTMLDivElement>(null)
  const [drawCancel, setDrawCancel] = useState<boolean>(false)
  const { name, questions, deadline } = weeks[selectedWeek] || ({} as WeekType)
  const [outdated, setOutdated] = useState<boolean>(new Date().getTime() > deadline)

  // container fade animations

  const gotChanges = getWeekChangesStatus()

  useEffect(() => {
    animateWeekFadeOut(containerRef)
  }, [tabActive])

  useEffect(() => {
    animateWeekCancel(drawCancel, getWeekChangesStatus(), cancelRef, setDrawCancel)
  }, [gotChanges, drawCancel])

  // helpers

  const adm = admin && !adminAsPlayer

  useEffect(() => {
    const interval = setInterval(() => {
      const newOutdated = new Date().getTime() > deadline
      newOutdated !== outdated && setOutdated(newOutdated)
    }, 1000)
    return () => clearInterval(interval) 
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    outdated && handleDiscard() 
    // eslint-disable-next-line
  }, [outdated])

  // action handlers

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

  const { buttonChangesMsg, buttonSaveMsg, buttonCancelMsg } = i18n(locale, 'buttons') as LocaleType
  const { successMsg, failureMsg, playerMsg, adminMsg } = i18n(locale, 'week') as LocaleType

  return currentWeek > -1 ? (
    <div className="container animate-fade-in-up" ref={containerRef}>
      <div className="week-header">
        <div className="week-header__name bold">{name}</div>
        {admin && isItYou ? (
          <Switch onChange={handleAdminAsPlayer} checked={adminAsPlayer} messageOn={playerMsg} messageOff={adminMsg} />
        ) : null}
      </div>
      <OtherUser containerRef={containerRef} />
      <ToastContainer position="top-center" autoClose={duration * 10} theme="colored" pauseOnHover={false} />
      <WeekCountdown />
      {questions &&
        Object.keys(questions)
          .map((el) => Number(el))
          .map((id, index) => (
            <div key={index}>
              <WeekQuestion id={id} />
            </div>
          ))}
      <Button onClick={handleSubmit} disabled={!getWeekChangesStatus() || (outdated && !adm)} className="week-button">
        {!getWeekChangesStatus() ? buttonChangesMsg : buttonSaveMsg}
      </Button>
      {drawCancel ? (
        <div className="animate-fade-in-up" ref={cancelRef}>
          <Button onClick={handleDiscard} className="week-button">
            {buttonCancelMsg}
          </Button>
        </div>
      ) : null}
    </div>
  ) : null
}
