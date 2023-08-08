import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { OtherUser } from '../UI'
import { selectApp, selectUser, selectWeeks } from '../redux/selectors'
import { appActions, editorActions } from '../redux/slices'

export const Weeklist = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const containerRef = useRef<HTMLDivElement>(null)
  const { editor, isItYou, tabActive } = useSelector(selectApp)
  const { admin } = useSelector(selectUser)
  const weeks = useSelector(selectWeeks)

  useEffect(() => {
    const list = containerRef.current?.classList
    list?.add('animate-fade-in-up')
    setTimeout(() => list?.remove('animate-fade-in-up'), 300)
  }, [isItYou, tabActive])

  const clickHandler = (selectedWeek: number) => {
    dispatch(appActions.setSelectedWeek(selectedWeek))
    const setEditor = () => {
      dispatch(editorActions.setEditor(weeks[selectedWeek]))

      navigate(`/editor/${selectedWeek}`)
    }
    editor ? setEditor() : navigate(`/week/${selectedWeek}`)
  }

  return (
    <div className="container" ref={containerRef}>
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
