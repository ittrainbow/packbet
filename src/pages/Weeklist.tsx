import { useDispatch, useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { selectApp, selectUser, selectWeeks } from '../redux/selectors'
import { appActions, editorActions } from '../redux/slices'
import { fadeInOut, fadeOutIn } from '../helpers'
import { OtherUser } from '../UI'

export const WeekList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const containerRef = useRef<HTMLDivElement>(null)
  const { editor, isItYou, tabActive } = useSelector(selectApp)
  const { admin } = useSelector(selectUser)
  const weeks = useSelector(selectWeeks)

  const clickHandler = (selectedWeek: number) => {
    fadeInOut(containerRef)
    dispatch(appActions.setSelectedWeek(selectedWeek))
    const setEditor = () => {
      dispatch(editorActions.setEditor(weeks[selectedWeek]))
      navigate(`/editor/${selectedWeek}`)
    }
    setTimeout(() => (editor ? setEditor() : navigate(`/week/${selectedWeek}`)), 200)
  }

  useEffect(() => {
    if ((editor && tabActive !== 5) || (!editor && tabActive !== 3)) {
      fadeInOut(containerRef)
    }

    if ((editor && tabActive === 3) || (!editor && tabActive === 5)) {
      fadeInOut(containerRef)
      setTimeout(() => fadeOutIn(containerRef), 200)
    }
  }, [tabActive, editor])

  return (
    <div className="container animate-fade-in-up" ref={containerRef}>
      {!isItYou && !editor ? <OtherUser /> : null}
      {Object.keys(weeks)
        .map((el) => Number(el))
        .filter((el) => weeks[el].active || editor || admin)
        .sort((a, b) => b - a)
        .map((el) => {
          const { name } = weeks[el]
          const selectedWeek = Number(el)
          return (
            <div key={selectedWeek} className="week" onClick={() => clickHandler(selectedWeek)}>
              <div className="week__desc">{name}</div>
            </div>
          )
        })}
    </div>
  )
}
