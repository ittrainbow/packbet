import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { answersActions, resultsActions, userActions } from '../../redux/slices'
import { selectApp, selectLocation, selectUser } from '../../redux/selectors'
import { OtherUser, Button, Switch } from '../../UI'
import { useChanges, useFade } from '../../hooks'
import { i18n, LocaleType } from '../../locale'
import { WeekQuestion, WeekCountdown } from '.'
import * as TYPES from '../../redux/storetypes'
import { IStore, WeekType } from '../../types'

export const Week = () => {
  const dispatch = useDispatch()
  const { selectedWeek, currentWeek, isItYou, duration, tabActive } = useSelector(selectApp)
  const { admin, adminAsPlayer, locale, uid } = useSelector(selectUser)
  const { pathname } = useSelector(selectLocation)
  const answers = useSelector((store: IStore) => store.answers)
  const results = useSelector((store: IStore) => store.results)
  const weeks = useSelector((store: IStore) => store.weeks)
  const compare = useSelector((store: IStore) => store.compare)
  const containerRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef<HTMLDivElement>(null)
  const [drawCancel, setDrawCancel] = useState<boolean>(false)
  const { name, questions, deadline } = weeks[selectedWeek] || ({} as WeekType)
  const [outdated, setOutdated] = useState<boolean>(new Date().getTime() > deadline)

  const gotChanges = useChanges()

  // container fade animations

  const containerFade = useFade({ ref: containerRef })
  const cancelFade = useFade({ ref: cancelRef })

  useEffect(() => {
    !gotChanges && cancelFade.triggerFade()
  }, [gotChanges, cancelFade])

  useEffect(() => {
    const fromSeasonList = pathname.includes('week/') && tabActive !== 3
    const fromCurrentWeek = !pathname.includes('week/') && tabActive !== 2
    if (fromSeasonList || fromCurrentWeek) containerFade.triggerFade()
    // eslint-disable-next-line
  }, [tabActive, containerFade])

  // helpers

  const adm = admin && !adminAsPlayer

  useEffect(() => {
    setTimeout(() => setDrawCancel(!!gotChanges), duration)
  }, [gotChanges, duration])

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
      <Button onClick={handleSubmit} disabled={!gotChanges || (outdated && !adm)} className="week-button">
        {!gotChanges ? buttonChangesMsg : buttonSaveMsg}
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
