import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { selectApp, selectLocation, selectUser, selectWeeks } from '../redux/selectors'
import { animateFadeOut, animateSwitchWeekList } from '../helpers'
import { appActions, editorActions } from '../redux/slices'
import { OtherUser } from '../UI'

export const WeekList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { editor, isItYou, tabActive, duration } = useSelector(selectApp)
  const { admin } = useSelector(selectUser)
  const { pathname } = useSelector(selectLocation)
  const weeks = useSelector(selectWeeks)
  const containerRef = useRef<HTMLDivElement>(null)

  // container fade animations

  useEffect(() => {
    const thirdToFifth = tabActive === 5 && pathname.includes('season')
    const fifthToThird = tabActive === 3 && pathname.includes('calendar')
    const drawAnimation = thirdToFifth || fifthToThird
    drawAnimation && animateSwitchWeekList(containerRef)
    // eslint-disable-next-line
  }, [tabActive, editor])

  useEffect(() => {
    const drawAnimation = tabActive > 0 && tabActive % 2 === 0
    drawAnimation && animateFadeOut(containerRef)
  }, [tabActive])

  // action handlers

  const handleClick = (selectedWeek: number) => {
    animateFadeOut(containerRef)
    dispatch(appActions.setSelectedWeek(selectedWeek))
    const setEditor = () => {
      dispatch(editorActions.setEditor(weeks[selectedWeek]))
      navigate(`/editor/${selectedWeek}`)
    }
    setTimeout(() => (editor ? setEditor() : navigate(`/week/${selectedWeek}`)), duration)
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
