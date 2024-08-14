import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import clsx from 'clsx'
import { useDate, useFade } from '../hooks'
import { Locale, i18n } from '../locale'
import { selectApp, selectLocation, selectUser, selectWeeks } from '../redux/selectors'
import { appActions, editorActions } from '../redux/slices'
import { OtherUser } from '../ui'

export const WeekList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { editor, isItYou, tabActive, duration } = useSelector(selectApp)
  const { admin, locale } = useSelector(selectUser)
  const { pathname } = useSelector(selectLocation)
  const weeks = useSelector(selectWeeks)
  const containerRef = useRef<HTMLDivElement>(null)

  const triggerFade = useFade(containerRef)

  useEffect(() => {
    const fromSeasonList = pathname.includes('season') && tabActive !== 3
    const fromEditorList = pathname.includes('calendar') && tabActive !== 5
    if (fromSeasonList || fromEditorList) triggerFade()
    // eslint-disable-next-line
  }, [tabActive])

  // action handlers

  const handleClick = (selectedWeek: number) => {
    triggerFade()
    dispatch(appActions.setSelectedWeek(selectedWeek))
    const setEditor = () => {
      dispatch(editorActions.setEditor(weeks[selectedWeek]))
      navigate(`/editor/${selectedWeek}`)
    }
    setTimeout(() => (editor ? setEditor() : navigate(`/week/${selectedWeek}`)), duration)
  }

  // locale render and classes

  const showOtherUserBar = !isItYou && !editor && !pathname.includes('calendar')
  const { weekListMsg, weekListEditorMsg } = i18n(locale, 'weeklist') as Locale
  const { tab2msg } = i18n(locale, 'header') as Locale
  const getDate = useDate()

  return (
    <div className="p-3 grid gap-2 animate-fade-in-up" ref={containerRef}>
      <span className="flex flex-row gap-1 font-bold">
        {pathname.includes('calendar') ? weekListEditorMsg : weekListMsg}
      </span>

      {showOtherUserBar && <OtherUser containerRef={containerRef} />}
      <div className="grid gap-0.5">
        {Object.keys(weeks)
          .map((el) => Number(el))
          .filter((el) => weeks[el].active || editor || admin)
          .sort((a, b) => b - a)
          .map((el) => {
            const { name, deadline } = weeks[el]
            const selectedWeek = Number(el)
            const isRegular = !isNaN(Number(name.split('.')[0]))
            const adjustedTab2msg = isRegular ? tab2msg : ''
            const text = (adjustedTab2msg + ' ' + name).split('.')
            const date = getDate(deadline).split(' ')
            return (
              <>
                <div
                  key={selectedWeek}
                  className={clsx(
                    'px-3 py-1 grid grid-cols-[2.5fr,1fr] gap-1 border border-gray-400 rounded-md',
                    new Date().getTime() < deadline ? 'animate-bg-pulse' : 'bg-gray-200'
                  )}
                  onClick={() => handleClick(selectedWeek)}
                >
                  <div className="grid grid-cols-1 gap-0 relative">
                    <span className="text-xs text-gray-600 leading-4">{text[0]}</span>
                    <span className="text-md">{text[1]}</span>
                  </div>
                  <div className="text-xs relative grid grid-cols-1 gap-0 text-gray-600 leading-4">
                    <span>
                      {date[0]} {date[1]}
                    </span>
                    <span>{date[2]}</span>
                  </div>
                </div>
              </>
            )
          })}
      </div>
    </div>
  )
}
