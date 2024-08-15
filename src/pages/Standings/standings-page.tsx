import { useEffect, useRef, useState } from 'react'
import { BsGearFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import clsx from 'clsx'
import { ToastContainer, toast } from 'react-toastify'
import { StandingsArrows, StandingsHeader, StandingsRow, StandingsTools } from '.'
import { useFade } from '../../hooks'
import { Locale, i18n } from '../../locale'
import { selectApp, selectStandings, selectTools } from '../../redux/selectors'
import { toolsActions } from '../../redux/slices'
import { UPDATE_STANDINGS } from '../../redux/storetypes'
import { Store } from '../../types'
import { Button, OtherUser } from '../../ui'

export const StandingsPage = () => {
  const dispatch = useDispatch()
  const weeks = useSelector((store: Store) => store.weeks)
  const user = useSelector((store: Store) => store.user)
  const { tabActive, duration } = useSelector(selectApp)
  const { seasonSelected } = useSelector(selectTools)
  const standings = useSelector(selectStandings)
  const { showTools } = useSelector(selectTools)
  const { locale, admin } = user
  const containerRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const [fadeOutTools, setFadeOutTools] = useState<boolean>(false)

  const season =
    seasonSelected === 2022
      ? standings.season2022
      : seasonSelected === 2023
      ? standings.season2023
      : standings.season2024

  const containerFade = useFade(containerRef)
  const bodyFade = useFade(bodyRef)

  useEffect(() => {
    tabActive !== 4 && containerFade()
  }, [tabActive, containerFade])

  useEffect(() => {
    showTools && dispatch(toolsActions.setShowTools(false))
    // eslint-disable-next-line
  }, [])

  const handleSwitchTools = () => {
    setFadeOutTools(!fadeOutTools)
    bodyFade()
    setTimeout(() => dispatch(toolsActions.switchShowTools()), duration)
  }

  const { tableTierline, tableHeaderhMsg, tableNoGamesMsg, tableUpdate, tableUpdateSuccessMsg, tableUpdateFailureMsg } =
    i18n(locale, 'standings') as Locale

  const lastWeekName =
    !isNaN(Number(Object.keys(weeks).slice(-1)[0])) &&
    weeks[Number(Object.keys(weeks).slice(-1)[0])].name?.split('.')[1]

  const lastWeekNameAdjusted = lastWeekName ? tableHeaderhMsg + lastWeekName : tableNoGamesMsg

  function handleUpdateStandings() {
    const toastSuccess = () => toast.success(tableUpdateSuccessMsg)
    const toastFailure = () => toast.error(tableUpdateFailureMsg)
    const toaster = (success: boolean) => (success ? toastSuccess() : toastFailure())
    const type = UPDATE_STANDINGS
    const payload = { toaster }

    dispatch({ type, payload })
  }

  return (
    <>
      <div className="p-4 max-w-[32rem] animate-fade-in-up" ref={containerRef}>
        <div className="flex flex-row gap-1 pb-3 items-center">
          <span className="flex font-bold grow items-center">{lastWeekNameAdjusted}</span>
          <BsGearFill
            onClick={handleSwitchTools}
            className={clsx('text-xl transition', showTools ? 'text-green-600' : 'text-gray-800')}
          />
        </div>
        <div ref={bodyRef}>
          <StandingsTools />
          <div className="grid gap-0.5" ref={tableRef}>
            <OtherUser containerRef={containerRef} />
            <StandingsHeader />
            {season &&
              Object.values(season).map((_, index) => <StandingsRow key={index} fade={containerFade} index={index} />)}
            <span className="p-3 text-sm leading-4">{tableTierline}</span>
          </div>
          {admin && <Button onClick={handleUpdateStandings} text={tableUpdate} />}
        </div>
      </div>
      <StandingsArrows />
      <ToastContainer position="top-center" autoClose={duration * 10} theme="colored" pauseOnHover={false} />
    </>
  )
}
