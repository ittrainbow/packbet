import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import clsx from 'clsx'
import { useDate, useFade, usePageFadeClass } from '../hooks'
import { Locale, i18n } from '../locale'
import { selectApp, selectLocation, selectResults, selectUser, selectWeeks } from '../redux/selectors'
import { appActions, editorActions } from '../redux/slices'
import { OtherUserMessage, ScoreChip } from '../ui'
import { parseWeekName } from '../utils'

type WeekStatus = 'open' | 'started' | 'final'

const statusDot: Record<WeekStatus, string> = {
  open: 'bg-accent',
  started: 'bg-ink/25',
  final: 'bg-ink/25'
}

export const WeekList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fadeClass = usePageFadeClass()
  const { editor, isItYou, duration, lastSeasonLastWeek, currentWeek } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const { pathname } = useSelector(selectLocation)
  const weeks = useSelector(selectWeeks)
  const results = useSelector(selectResults)
  const containerRef = useRef<HTMLDivElement>(null)

  const { triggerFade } = useFade(containerRef)

  const handleClick = (selectedWeek: number) => {
    triggerFade()
    dispatch(appActions.setSelectedWeek(selectedWeek))
    if (!editor) dispatch(appActions.setTabActive(2))
    const setEditor = () => {
      dispatch(editorActions.setEditor(weeks[selectedWeek]))
      navigate(`/editor/${selectedWeek}`)
    }
    setTimeout(() => (editor ? setEditor() : navigate(`/week/${selectedWeek}`)), duration + 33)
  }

  const showOtherUserBar = !isItYou && !editor && !pathname.includes('calendar')
  const { weekListMsg, weekListEditorMsg, weekStatusStarted, weekListEmptyMsg } = i18n(locale, 'weeklist') as Locale
  const { tab2msg } = i18n(locale, 'header') as Locale
  const getDate = useDate()

  const listedWeeks = Object.keys(weeks)
    .map((el) => Number(el))
    .filter((el) => el > lastSeasonLastWeek && (weeks[el].active || editor))
    .sort((a, b) => b - a)

  const getStatus = (weekId: number): WeekStatus => {
    const { deadline } = weeks[weekId]
    const hasResults = Boolean(results[weekId] && Object.keys(results[weekId]).length)
    if (hasResults) return 'final'
    if (Date.now() >= deadline) return 'started'
    return 'open'
  }

  return (
    <div
      className={clsx('p-4 max-w-[32rem] grid gap-2', fadeClass)}
      ref={containerRef}
      id="container"
    >
      <span className="flex flex-row gap-1 font-bold text-base">
        {pathname.includes('calendar') ? weekListEditorMsg : weekListMsg}
      </span>

      {showOtherUserBar && <OtherUserMessage containerRef={containerRef} />}
      {listedWeeks.length === 0 ? (
        <span className="text-sm text-ink-muted">{weekListEmptyMsg}</span>
      ) : (
        <div className="grid gap-1.5">
          {listedWeeks.map((el) => {
            const { name, deadline } = weeks[el]
            const selectedWeek = Number(el)
            const isRegular = !isNaN(Number(name.split('.')[0]))
            const adjustedTab2msg = isRegular ? tab2msg : ''
            const text = (adjustedTab2msg + ' ' + name).split('.')
            const { match, score } = parseWeekName(name)
            const date = getDate(deadline).split(' ')
            const status = getStatus(selectedWeek)
            const isCurrent = selectedWeek === currentWeek
            return (
              <button
                key={selectedWeek}
                className={clsx(
                  'px-3 py-1.5 grid grid-cols-[2.5fr,1fr] gap-1 border rounded-xl text-left',
                  Date.now() < deadline ? 'bg-white' : 'bg-white/70',
                  isCurrent ? 'border-ink/40' : 'border-ink/20'
                )}
                onClick={() => handleClick(selectedWeek)}
              >
                <div className="grid grid-cols-1 gap-0 relative min-w-0">
                  <div className="flex items-center gap-1.5 min-w-0 mr-auto">
                    <span className="text-xs text-ink-muted leading-4 shrink-0">{text[0]}</span>
                    <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', statusDot[status])} />
                    {status === 'started' ? (
                      <span className="text-xs text-ink-muted leading-4 truncate">{weekStatusStarted}</span>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-md mr-auto leading-4 min-w-0 truncate">{match}</span>
                    {score ? <ScoreChip score={score.replace('-', '–')} /> : null}
                  </div>
                </div>
                <div className="text-xs relative grid gap-0 text-ink-muted leading-4">
                  <span className="ml-auto">
                    {date[0]} {date[1]}
                  </span>
                  <span className="ml-auto">{date[3]}</span>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
