import { useEffect, useRef, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { IStore, LocaleType } from '../types'
import { animateCancel, weekGotChanges, weekAnimate } from '../helpers'
import { OtherUser, Button, Kickoff, Switch, WeekRow } from '../UI'
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
  const { name, questions } = weeks[selectedWeek]

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

  // click action handlers

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
          return (
            <div key={index}>
              <WeekRow id={id} />
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
