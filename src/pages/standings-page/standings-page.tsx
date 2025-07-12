import { useEffect, useRef, useState } from 'react'
import { BsGearFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import clsx from 'clsx'
import { toast, ToastContainer } from 'react-toastify'
import { StandingsArrows, StandingsHeader, StandingsRow, StandingsTools } from '.'
import { useFade } from '../../hooks'
import { i18n, Locale } from '../../locale'
import { selectApp, selectStandings, selectTools } from '../../redux/selectors'
import { toolsActions } from '../../redux/slices'
import { UPDATE_STANDINGS } from '../../redux/storetypes'
import { Store } from '../../types'
import { Button, OldStandingsMessage, OtherUserMessage } from '../../ui'

export const StandingsPage = () => {
  const dispatch = useDispatch()
  const weeks = useSelector((store: Store) => store.weeks)
  const user = useSelector((store: Store) => store.user)
  const results = useSelector((store: Store) => store.results)
  const { lastSeasonLastWeek, tabActive, duration } = useSelector(selectApp)
  const { seasonSelected } = useSelector(selectTools)
  const standings = useSelector(selectStandings)
  const { showTools } = useSelector(selectTools)
  const { locale, admin } = user
  const containerRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const [fadeOutTools, setFadeOutTools] = useState<boolean>(false)

  const standingsSeason =
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
    setTimeout(() => setSelectedRow(null), duration)
  }

  const {
    tableTierline,
    tableHeaderhMsg,
    tableNoGamesMsg,
    tableSeason,
    tableUpdateSuccessMsg,
    tableUpdateFailureMsg,
    tableUpdate
  } = i18n(locale, 'standings') as Locale

  const lastWeekThatGotResults =
    Object.keys(results)
      .map((el) => Number(el))
      .at(-1) ?? 0

  const gotFinalScore = !isNaN(parseInt(weeks[lastWeekThatGotResults]?.name.at(-1) ?? ''))

  const lastWeekName = weeks[lastWeekThatGotResults]?.name
    .split(' ')
    .slice(1, gotFinalScore ? -1 : undefined)
    .join(' ')

  const lastWeekNameAdjusted =
    seasonSelected < 2024
      ? `${tableSeason} ${seasonSelected}`
      : lastWeekThatGotResults > lastSeasonLastWeek
      ? `${tableHeaderhMsg} ${lastWeekName}`
      : tableNoGamesMsg

  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  function handleUpdateStandings() {
    const toastSuccess = () => toast.success(tableUpdateSuccessMsg)
    const toastFailure = () => toast.error(tableUpdateFailureMsg)
    const toaster = (success: boolean) => (success ? toastSuccess() : toastFailure())

    dispatch({ type: UPDATE_STANDINGS, payload: { toaster } })
  }

  return (
    <>
      <div className="p-4 max-w-[32rem] animate-fade-in-up" ref={containerRef}>
        <div className="flex flex-row gap-1 items-center">
          <span className="flex font-bold grow items-center">{lastWeekNameAdjusted}</span>
          <Button
            onClick={handleSwitchTools}
            icon={<BsGearFill />}
            className={clsx('text-xl transition border-none !w-10', showTools ? 'text-green-600' : 'text-gray-800')}
          />
        </div>
        <div ref={bodyRef}>
          <StandingsTools />
          <div className="grid gap-1" ref={tableRef}>
            {seasonSelected === 2022 ? <OldStandingsMessage /> : <OtherUserMessage containerRef={containerRef} />}
            <StandingsHeader />
            {standingsSeason &&
              Object.values(standingsSeason).map((_, index) => (
                <StandingsRow
                  key={index}
                  fade={containerFade}
                  index={index}
                  selectedRow={selectedRow}
                  setSelectedRow={setSelectedRow}
                />
              ))}
            <span className="p-3 text-sm leading-4">{tableTierline}</span>
          </div>

          {admin && <Button onClick={handleUpdateStandings} text={tableUpdate} />}
        </div>
      </div>
      <StandingsArrows />
      <ToastContainer position="top-center" autoClose={duration * 12} theme="colored" pauseOnHover={false} />
    </>
  )
}
