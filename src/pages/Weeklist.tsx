import { useDispatch, useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { selectApp, selectUser, selectWeeks } from '../redux/selectors'
import { appActions, editorActions } from '../redux/slices'
import { animateFadeOut, animateSwitchWeekList } from '../helpers'
import { OtherUser } from '../UI'

export const WeekList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const containerRef = useRef<HTMLDivElement>(null)
  const { editor, isItYou, tabActive } = useSelector(selectApp)
  const { admin } = useSelector(selectUser)
  const weeks = useSelector(selectWeeks)

  // container fade animations

  useEffect(() => {
    animateSwitchWeekList(containerRef)
  }, [tabActive, editor])

  // action handlers

  const handleClick = (selectedWeek: number) => {
    animateFadeOut(containerRef)
    dispatch(appActions.setSelectedWeek(selectedWeek))
    const setEditor = () => {
      dispatch(editorActions.setEditor(weeks[selectedWeek]))
      navigate(`/editor/${selectedWeek}`)
    }
    setTimeout(() => (editor ? setEditor() : navigate(`/week/${selectedWeek}`)), 200)
  }

  return (
    <div className="container animate-fade-in-up" ref={containerRef}>
      {!isItYou && !editor ? <OtherUser containerRef={containerRef} /> : null}
      {Object.keys(weeks)
        .map((el) => Number(el))
        .filter((el) => weeks[el].active || editor || admin)
        .sort((a, b) => b - a)
        .map((el) => {
          const { name } = weeks[el]
          const selectedWeek = Number(el)
          return (
            <div key={selectedWeek} className="week" onClick={() => handleClick(selectedWeek)}>
              <div className="week__desc">{name}</div>
            </div>
          )
        })}
    </div>
  )
}
