import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import clsx from 'clsx'
import { useChanges, useFade } from '../../hooks'
import { Locale, i18n } from '../../locale'
import { selectApp, selectLocation, selectUser } from '../../redux/selectors'
import { answersActions, resultsActions, userActions } from '../../redux/slices'
import * as TYPES from '../../redux/storetypes'
import { Store, Week } from '../../types'
import { Button, OtherUserMessage, Switch } from '../../ui'
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

  const { triggerFade } = useFade(containerRef)

  useEffect(() => {
    const fromSeasonList = pathname.includes('week/') && tabActive !== 3
    const fromCurrentWeek = !pathname.includes('week/') && tabActive !== 2
    if (fromSeasonList || fromCurrentWeek) return triggerFade()
    // eslint-disable-next-line
  }, [tabActive, triggerFade])

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
  }, [outdated, deadline])

  const handleDiscard = () => {
    dispatch(answersActions.updateAnswers({ answers: compare.answers, uid }))
    admin && dispatch(resultsActions.updateResults({ results: compare.results, selectedWeek }))
  }

  const handleAdminAsPlayer = () => {
    dispatch(userActions.setAdminAsPlayer(!adminAsPlayer))
  }

  const { buttonChangesMsg, buttonSaveMsg, buttonCancelMsg } = i18n(locale, 'buttons') as Locale
  const { successMsg, failureMsg, playerMsg, adminMsg } = i18n(locale, 'week') as Locale

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

  if (currentWeek < 0) return null

  return (
    <div
      className={clsx(
        'grid gap-1.5 p-4 max-w-[32rem] text-sm'
        // appNaviEvent && 'animate-fade-in-up'
      )}
      ref={containerRef}
    >
      <div className="grid grid-cols-[1fr,auto] gap-2 items-start">
        <span className="font-bold text-base">{name?.split('.')[1]}</span>
        {admin && isItYou ? (
          <Switch
            onChange={handleAdminAsPlayer}
            narrow
            checked={adminAsPlayer}
            messageOff={adminMsg}
            messageOn={playerMsg}
          />
        ) : null}
      </div>
      <OtherUserMessage containerRef={containerRef} />

      <WeekCountdown />
      <div className="grid gap-1.5">
        {questions &&
          Object.keys(questions)
            .map((el) => Number(el))
            .map((id, index) => (
              <MemoizedWeekQuestion id={id} key={index} result={results[selectedWeek] && results[selectedWeek][id]} />
            ))}
      </div>
      {isItYou ? (
        <div className="flex">
          <Button
            onClick={handleSubmit}
            disabled={!gotChanges}
            className="me-1"
            text={!gotChanges ? buttonChangesMsg : buttonSaveMsg}
          />
          <Button onClick={handleDiscard} disabled={!gotChanges} className="week-button" text={buttonCancelMsg} />
        </div>
      ) : null}
      <ToastContainer position="top-center" autoClose={duration * 12} theme="colored" pauseOnHover={false} />
    </div>
  )
}
