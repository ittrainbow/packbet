import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

import clsx from 'clsx'
import { useChanges, usePageFadeClass } from '@/hooks'
import { Locale, i18n } from '@/locale'
import { selectApp, selectUser } from '@/redux/selectors'
import { answersActions, resultsActions, userActions } from '@/redux/slices'
import * as TYPES from '@/redux/storetypes'
import { Store, Week } from '@/types'
import { parseWeekName } from '@/utils'
import { Button, OtherUserMessage, Switch } from '@/ui'
import { WeekCountdown } from './week-countdown'
import { MemoizedWeekQuestion } from './week-question'
import { WeekQuestionStats } from './week-question-stats'

export const WeekPage = () => {
  const dispatch = useDispatch()
  const fadeClass = usePageFadeClass()
  const { selectedWeek, currentWeek, isItYou, duration } = useSelector(selectApp)
  const { admin, adminAsPlayer, locale, uid } = useSelector(selectUser)
  const answers = useSelector((store: Store) => store.answers)
  const results = useSelector((store: Store) => store.results)
  const weeks = useSelector((store: Store) => store.weeks)
  const compare = useSelector((store: Store) => store.compare)
  const containerRef = useRef<HTMLDivElement>(null)
  const { name, questions, deadline } = weeks[selectedWeek] || ({} as Week)
  const { match } = parseWeekName(name)
  const [outdated, setOutdated] = useState<boolean>(new Date().getTime() > deadline)

  const gotChanges = useChanges()

  const adm = admin && !adminAsPlayer
  const showActionButtons = isItYou && (adm || !outdated)

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
      className={clsx('grid gap-3 px-4 py-5 max-w-[32rem] w-full min-w-0 text-sm', fadeClass)}
      ref={containerRef}
      id="container"
    >
      <div className="flex items-center gap-2 min-h-6">
        <span className="font-bold text-base leading-6 grow min-w-0 truncate">{match}</span>
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
      {showActionButtons ? (
        <div className="flex">
          <Button
            onClick={handleSubmit}
            disabled={!gotChanges}
            className="mr-1"
            text={!gotChanges ? buttonChangesMsg : buttonSaveMsg}
          />
          <Button onClick={handleDiscard} disabled={!gotChanges} className="week-button" text={buttonCancelMsg} />
        </div>
      ) : null}
      <WeekQuestionStats outdated={outdated} />
      <ToastContainer position="top-center" autoClose={duration * 12} theme="colored" pauseOnHover={false} />
    </div>
  )
}
