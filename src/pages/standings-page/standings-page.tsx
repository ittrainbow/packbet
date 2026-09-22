import { GearIcon } from '@/icons'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useFade, usePageFadeClass } from '@/hooks'
import { i18n } from '@/locale'
import { selectApp, selectStandings, selectTools } from '@/redux/selectors'
import { toolsActions } from '@/redux/slices'
import { UPDATE_STANDINGS } from '@/redux/storetypes'
import { Store } from '@/types'
import { Button, OldStandingsMessage, OtherUserMessage } from '@/ui'
import {
  getSeasonStandings,
  getSortedStandingsIndices,
  getWeekStandings,
  parseWeekName,
  StandingsSortMode
} from '@/utils'
import clsx from 'clsx'
import { toast, ToastContainer } from 'react-toastify'
import { StandingsArrows, StandingsHeader, StandingsRow, StandingsTools } from '.'

export function StandingsPage() {
  const dispatch = useDispatch()
  const weeks = useSelector((store: Store) => store.weeks)
  const user = useSelector((store: Store) => store.user)
  const results = useSelector((store: Store) => store.results)
  const fadeClass = usePageFadeClass()
  const { lastSeasonLastWeek, duration } = useSelector(selectApp)
  const { seasonSelected, showBuddies, showOneWeek, standingsSearch } = useSelector(selectTools)
  const standings = useSelector(selectStandings)
  const { showTools } = useSelector(selectTools)
  const { locale, admin, buddies } = user
  const containerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const [sortMode, setSortMode] = useState<StandingsSortMode>('default')
  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  const standingsSeason = getSeasonStandings(standings, seasonSelected)
  const standingsWeek = getWeekStandings(standings, seasonSelected)

  const tableSource = showOneWeek && seasonSelected !== 2022 ? standingsWeek : standingsSeason
  const tableRows = useMemo(() => (tableSource ? Object.values(tableSource) : []), [tableSource])
  const limitSortEnabled = seasonSelected !== 2022 && !showOneWeek

  const sortedIndices = useMemo(() => {
    if (seasonSelected === 2022) return tableRows.map((_, i) => i)
    return getSortedStandingsIndices(tableRows, sortMode)
  }, [tableRows, sortMode, seasonSelected])

  const hasVisibleBuddyRows =
    !showBuddies ||
    tableRows.some(
      (row) =>
        row.name.toLowerCase().includes(standingsSearch.toLowerCase()) &&
        buddies?.includes(('uid' in row ? row.uid : undefined) ?? '')
    )

  const { triggerFade: containerFade } = useFade(containerRef)

  useEffect(() => {
    showTools && dispatch(toolsActions.setShowTools(false))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setSortMode('default')
  }, [seasonSelected])

  useEffect(() => {
    if (!limitSortEnabled && (sortMode === 'limit-desc' || sortMode === 'limit-asc')) {
      setSortMode('default')
    }
  }, [limitSortEnabled, sortMode])

  const handleSwitchTools = () => {
    dispatch(toolsActions.switchShowTools())
    setSelectedRow(null)
  }

  const handleSortPercent = () => {
    setSortMode((mode) => (mode === 'percent-asc' ? 'default' : 'percent-asc'))
  }

  const handleSortLimit = () => {
    if (!limitSortEnabled) return
    setSortMode((mode) => {
      if (mode === 'limit-desc') return 'limit-asc'
      if (mode === 'limit-asc') return 'default'
      return 'limit-desc'
    })
  }

  const {
    tableTierline,
    tableHeaderhMsg,
    tableNoGamesMsg,
    tableSeason,
    tableUpdateSuccessMsg,
    tableUpdateFailureMsg,
    tableUpdate,
    tableNoBuddiesMsg
  } = i18n(locale, 'standings')

  const lastWeekThatGotResults =
    Object.keys(results)
      .map((el) => Number(el))
      .at(-1) ?? 0

  const { match: lastWeekMatch } = parseWeekName(weeks[lastWeekThatGotResults]?.name ?? '')
  const showWeekResult = seasonSelected >= 2024 && lastWeekThatGotResults > lastSeasonLastWeek

  const lastWeekNameAdjusted =
    seasonSelected < 2024
      ? `${tableSeason} ${seasonSelected}`
      : showWeekResult
        ? `${tableHeaderhMsg} ${lastWeekMatch}`
        : tableNoGamesMsg

  function handleUpdateStandings() {
    const toastSuccess = () => toast.success(tableUpdateSuccessMsg)
    const toastFailure = () => toast.error(tableUpdateFailureMsg)
    const toaster = (success: boolean) => (success ? toastSuccess() : toastFailure())

    dispatch({ type: UPDATE_STANDINGS, payload: { toaster } })
  }

  return (
    <>
      <div className={clsx('px-4 py-5 max-w-[32rem] grid gap-3', fadeClass)} ref={containerRef} id="container">
        <div className="flex flex-row items-center h-6 gap-1">
          <span className="font-bold text-base leading-6 grow min-w-0 truncate">{lastWeekNameAdjusted}</span>
          <Button
            onClick={handleSwitchTools}
            icon={<GearIcon className="text-[24px]" />}
            className={clsx('transition border-none !bg-transparent !w-6 !h-6', showTools ? 'text-accent' : 'text-ink')}
          />
        </div>
        <div>
          <StandingsTools />
          <div className="grid gap-1" ref={tableRef}>
            {seasonSelected === 2022 ? <OldStandingsMessage /> : <OtherUserMessage containerRef={containerRef} />}
            {showBuddies && !hasVisibleBuddyRows ? (
              <span className="py-3 text-sm leading-4 text-ink-muted">{tableNoBuddiesMsg}</span>
            ) : (
              <>
                <StandingsHeader
                  onSortPercent={handleSortPercent}
                  onSortLimit={handleSortLimit}
                  limitSortEnabled={limitSortEnabled}
                />
                {sortedIndices.map((index) => (
                  <StandingsRow
                    key={'uid' in (tableRows[index] ?? {}) ? (tableRows[index].uid ?? index) : index}
                    fade={containerFade}
                    index={index}
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                  />
                ))}
                <span className="p-3 text-sm leading-4 text-ink-muted">{tableTierline}</span>
              </>
            )}
          </div>

          {admin && <Button onClick={handleUpdateStandings} text={tableUpdate} />}
        </div>
      </div>
      <StandingsArrows />
      <ToastContainer position="top-center" autoClose={duration * 12} theme="colored" pauseOnHover={false} />
    </>
  )
}
