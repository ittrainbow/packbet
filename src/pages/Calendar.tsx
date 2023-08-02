import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { OtherUser } from '../UI'
import { selectApp, selectWeeks } from '../redux/selectors'
import { appActions, editorActions } from '../redux/slices'

export const Calendar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { editor, isItYou } = useSelector(selectApp)
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
    <div className="container">
      {!isItYou && !editor ? <OtherUser /> : null}
      <div className="weeklist">
        {Object.keys(weeks)
          .map((el) => Number(el))
          .filter((el) => weeks[el].active || editor)
          .sort((a, b) => b - a)
          .map((el) => {
            const { name } = weeks[el]
            const selectedWeek = Number(el)
            return (
              <div
                key={selectedWeek}
                className="week"
                onClick={() => clickHandler(selectedWeek)}
              >
                <div className="week__desc">{name}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
