import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { OtherUser } from '../UI'
import { useAppContext } from '../context/Context'
import { selectApp } from '../redux/selectors'
import { appActions } from '../redux/slices'

export const Calendar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { editor, isItYou } = useSelector(selectApp)
  const { weeksContext, setEditorContext } = useAppContext()
  // const { isItYou } = appContext

  const clickHandler = (selectedWeek: number) => {
    dispatch(appActions.setSelectedWeek(selectedWeek))
    const setEditorTab = () => {
      setEditorContext(weeksContext[selectedWeek])
      navigate(`/editor/${selectedWeek}`)
    }
    editor ? setEditorTab() : navigate(`/week/${selectedWeek}`)
  }

  return (
    <div className="container">
      {!isItYou && !editor ? <OtherUser /> : null}
      <div className="weeklist">
        {Object.keys(weeksContext)
          .map((el) => Number(el))
          .filter((el) => weeksContext[el].active || editor)
          .sort((a, b) => b - a)
          .map((el) => {
            const { name } = weeksContext[el]
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
