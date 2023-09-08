import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { selectApp, selectLocation, selectUser, selectWeeks } from '../redux/selectors'
import { appActions, editorActions } from '../redux/slices'
import { LocaleType, i18n } from '../locale'
import { useFade, useDate } from '../hooks'
import { OtherUser } from '../UI'

export const WeekList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
  const { weekListMsg, weekListEditorMsg } = i18n(locale, 'weeklist') as LocaleType
  const { tab2msg } = i18n(locale, 'header') as LocaleType
  const getDate = useDate()

  return (
    <div className="container animate-fade-in-up" ref={containerRef}>
      <div className="title flexrow5">
        <div className="title__name bold">{pathname.includes('calendar') ? weekListEditorMsg : weekListMsg}</div>
      </div>
      {showOtherUserBar && <OtherUser containerRef={containerRef} />}
      {Object.keys(weeks)
        .map((el) => Number(el))
        .filter((el) => weeks[el].active || editor || admin)
        .sort((a, b) => b - a)
        .map((el) => {
          const { name } = weeks[el]
          const selectedWeek = Number(el)
          return (
            <div key={selectedWeek} className="weeklist" onClick={() => handleClick(selectedWeek)}>
              <div className="weeklist__desc">{tab2msg} {name}</div>
              <div className="weeklist__date">{getDate(weeks[el].deadline)}</div>
            </div>
          )
        })}
    </div>
  )
}
