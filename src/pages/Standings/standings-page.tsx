import { useEffect, useRef, useState } from 'react'
import { BsGearFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

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
  const results = useSelector((store: Store) => store.results)
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

  const getGearClass = `standings-top-container__${showTools ? 'gear-on' : 'gear-off'}`

  const { tableTierline, tableHeaderhMsg, tableNoGamesMsg, tableUpdate, tableUpdateSuccessMsg, tableUpdateFailureMsg } =
    i18n(locale, 'standings') as Locale

  const getLastWeekName = () => {
    const lastWeekNumber = Number(Object.keys(results).slice(-1)[0])
    const lastWeekName = !isNaN(lastWeekNumber) && weeks[lastWeekNumber].name.split('.')[1]
    return lastWeekName ? tableHeaderhMsg + lastWeekName : tableNoGamesMsg
  }

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
      <div className="container animate-fade-in-up" ref={containerRef}>
        <div className="standings-top-container flexrow5">
          <div className="standings-top-container__title">{getLastWeekName()}</div>
          <BsGearFill onClick={handleSwitchTools} className={getGearClass} />
        </div>
        <div ref={bodyRef}>
          <StandingsTools />
          <div className="standings" ref={tableRef}>
            <OtherUser containerRef={containerRef} />
            <StandingsHeader />
            {season &&
              Object.values(season).map((_, index) => <StandingsRow key={index} fade={containerFade} index={index} />)}
            <div className="tierline">{tableTierline}</div>
          </div>
          {admin && <Button onClick={handleUpdateStandings} children={tableUpdate} />}
        </div>
      </div>
      <StandingsArrows />
      <ToastContainer position="top-center" autoClose={duration * 10} theme="colored" pauseOnHover={false} />
    </>
  )
}
