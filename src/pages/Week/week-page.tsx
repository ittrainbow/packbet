import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { useChanges, useFade } from '../../hooks'
import { Locale, i18n } from '../../locale'
import { selectApp, selectLocation, selectUser } from '../../redux/selectors'
import { answersActions, resultsActions, userActions } from '../../redux/slices'
import * as TYPES from '../../redux/storetypes'
import { Store, Week } from '../../types'
import { Button, OtherUser, Switch } from '../../ui'
import { WeekCountdown } from './week-countdown'
import { MemoizedWeekQuestion } from './week-question'

export const WeekPage = () => {
  const dispatch = useDispatch()
  const { selectedWeek, currentWeek, isItYou, duration, tabActive } = useSelector(selectApp)
  const { admin, adminAsPlayer, locale, uid } = useSelector(selectUser)
  const { pathname } = useSelector(selectLocation)
  const answers = useSelector((store: Store) => store.answers)
  const results = useSelector((store: Store) => store.results)
  const weeks = useSelector((store: Store) => store.weeks)
  const compare = useSelector((store: Store) => store.compare)
  const containerRef = useRef<HTMLDivElement>(null)
  const { name, questions, deadline } = weeks[selectedWeek] || ({} as Week)
  const [outdated, setOutdated] = useState<boolean>(new Date().getTime() > deadline)

  const gotChanges = useChanges()

  const triggerFade = useFade(containerRef)

  useEffect(() => {
    const fromSeasonList = pathname.includes('week/') && tabActive !== 3
    const fromCurrentWeek = !pathname.includes('week/') && tabActive !== 2
    if (fromSeasonList || fromCurrentWeek) triggerFade()
    // eslint-disable-next-line
  }, [tabActive, triggerFade])

  // helpers

  const adm = admin && !adminAsPlayer

  useEffect(() => {
    const interval = setInterval(() => {
      const newOutdated = new Date().getTime() > deadline
      if (newOutdated && !outdated) {
        setOutdated(newOutdated)
        handleDiscard()
      }
    }, 1000)
    return () => clearInterval(interval)
    // eslint-disable-next-line
  }, [])

  // action handlers

  const handleSubmit = async () => {
    const data = adm ? results : answers[uid]
    const firstData = !!Object.keys(data).length
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

  const { buttonChangesMsg, buttonSaveMsg, buttonCancelMsg } = i18n(locale, 'buttons') as Locale
  const { successMsg, failureMsg, playerMsg, adminMsg } = i18n(locale, 'week') as Locale

  return currentWeek > -1 ? (
    <div className="p-4 text-sm animate-fade-in-up" ref={containerRef}>
      <div className="title flexrow5">
        <div className="text-lg font-bold">{name.split('.')[1]}</div>
        {admin && isItYou ? (
          <Switch onChange={handleAdminAsPlayer} checked={adminAsPlayer} messageOff={adminMsg} messageOn={playerMsg} />
        ) : null}
      </div>
      <OtherUser containerRef={containerRef} />
      <ToastContainer position="top-center" autoClose={duration * 10} theme="colored" pauseOnHover={false} />
      <WeekCountdown />
      {questions &&
        Object.keys(questions)
          .map((el) => Number(el))
          .map((id, index) => {
            const result = results[selectedWeek] && results[selectedWeek][id]
            return (
              <div key={index}>
                <MemoizedWeekQuestion id={id} result={result} />
              </div>
            )
          })}
      {isItYou ? (
        <div className="flexrow5">
          <Button onClick={handleSubmit} disabled={!gotChanges} className="week-button">
            {!gotChanges ? buttonChangesMsg : buttonSaveMsg}
          </Button>
          <Button onClick={handleDiscard} disabled={!gotChanges} className="week-button">
            {buttonCancelMsg}
          </Button>
        </div>
      ) : null}
    </div>
  ) : null
}
