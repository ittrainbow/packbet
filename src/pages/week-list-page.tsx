import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import clsx from 'clsx'
import { useDate, useFade } from '../hooks'
import { Locale, i18n } from '../locale'
import { selectApp, selectLocation, selectUser, selectWeeks } from '../redux/selectors'
import { appActions, editorActions } from '../redux/slices'
import { OtherUserMessage } from '../ui'

export const WeekList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { editor, isItYou, tabActive, duration, lastSeasonLastWeek } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const { pathname } = useSelector(selectLocation)
  const weeks = useSelector(selectWeeks)
  const containerRef = useRef<HTMLDivElement>(null)

  const { triggerFade } = useFade(containerRef)

  useEffect(() => {
    const fromSeasonList = pathname.includes('season') && tabActive !== 3
    const fromEditorList = pathname.includes('calendar') && tabActive !== 5
    if (fromSeasonList || fromEditorList) return triggerFade()
    // eslint-disable-next-line
  }, [tabActive])

  const handleClick = (selectedWeek: number) => {
    triggerFade()
    dispatch(appActions.setSelectedWeek(selectedWeek))
    const setEditor = () => {
      dispatch(editorActions.setEditor(weeks[selectedWeek]))
      navigate(`/editor/${selectedWeek}`)
    }
    setTimeout(() => (editor ? setEditor() : navigate(`/week/${selectedWeek}`)), duration + 33)
  }

  const showOtherUserBar = !isItYou && !editor && !pathname.includes('calendar')
  const { weekListMsg, weekListEditorMsg } = i18n(locale, 'weeklist') as Locale
  const { tab2msg } = i18n(locale, 'header') as Locale
  const getDate = useDate()

  return (
    <div
      className={clsx(
        'p-4 max-w-[32rem] grid gap-2'
        // appNaviEvent && 'animate-fade-in-up'
      )}
      ref={containerRef}
    >
      <span className="flex flex-row gap-1 font-bold text-base">
        {pathname.includes('calendar') ? weekListEditorMsg : weekListMsg}
      </span>

      {showOtherUserBar && <OtherUserMessage containerRef={containerRef} />}
      <div className="grid gap-1.5">
        {Object.keys(weeks)
          .map((el) => Number(el))
          .filter((el) => el > lastSeasonLastWeek && (weeks[el].active || editor))
          .sort((a, b) => b - a)
          .map((el) => {
            const { name, deadline } = weeks[el]
            const selectedWeek = Number(el)
            const isRegular = !isNaN(Number(name.split('.')[0]))
            const adjustedTab2msg = isRegular ? tab2msg : ''
            const text = (adjustedTab2msg + ' ' + name).split('.')
            const date = getDate(deadline).split(' ')
            return (
              <button
                key={selectedWeek}
                className={clsx(
                  'px-3 py-1 grid grid-cols-[2.5fr,1fr] bg-white bg-opacity-60 gap-1 border border-gray-400 rounded-lg',
                  new Date().getTime() < deadline && 'bg-white bg-opacity-100'
                )}
                onClick={() => handleClick(selectedWeek)}
              >
                <div className="grid grid-cols-1 gap-0 relative">
                  <span className="text-xs text-gray-600 leading-4 me-auto">{text[0]}</span>
                  <span className="text-md me-auto">{text[1]}</span>
                </div>
                <div className="text-xs relative grid gap-0 text-gray-600 leading-4">
                  <span className="ms-auto">
                    {date[0]} {date[1]}
                  </span>
                  <span className="ms-auto">{date[3]}</span>
                </div>
              </button>
            )
          })}
      </div>
    </div>
  )
}
