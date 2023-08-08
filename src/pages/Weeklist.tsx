import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { OtherUser } from '../UI'
import { selectApp, selectUser, selectWeeks } from '../redux/selectors'
import { appActions, editorActions } from '../redux/slices'

export const Weeklist = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { editor, isItYou } = useSelector(selectApp)
  const { admin } = useSelector(selectUser)
  const weeks = useSelector(selectWeeks)

  const clickHandler = (selectedWeek: number) => {
    dispatch(appActions.setSelectedWeek(selectedWeek))
    const setEditor = () => {
      dispatch(editorActions.setEditor(weeks[selectedWeek]))

      navigate(`/editor/${selectedWeek}`)
    }
    editor ? setEditor() : navigate(`/week/${selectedWeek}`)
  }

  return (
    <>
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
    </>
  )
}
