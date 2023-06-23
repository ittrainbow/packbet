import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { OtherUser } from '../UI'
import { useAppContext } from '../context/Context'
import { selectApp } from '../redux/selectors'

export const Calendar = () => {
  const navigate = useNavigate()
  const { editor } = useSelector(selectApp)
  const { weeksContext, appContext, setAppContext, setEditorContext } = useAppContext()
  const { isItYou } = appContext

  const clickHandler = (selectedWeek: number, shortName: string) => {
    setAppContext({ ...appContext, selectedWeek })
    const setEditorTab = () => {
      setEditorContext(weeksContext[selectedWeek])
      navigate(`/editor/${shortName}`)
    }
    editor ? setEditorTab() : navigate(`/week/${shortName}`)
  }

  return (
    <div className="container">
      {!isItYou && !editor ? <OtherUser /> : null}
      <div className="weeklist">
        {Object.keys(weeksContext)
          .map((el) => Number(el))
          .sort((a, b) => b - a)
          .filter((el) => weeksContext[el].active || editor)
          .map((el) => {
            const { name } = weeksContext[el]
            const shortName = name.split(':')[0].split(' ')[1]
            const selectedWeek = Number(el)
            return (
              <div
                key={selectedWeek}
                className="week"
                onClick={() => clickHandler(selectedWeek, shortName)}
              >
                <div className="week__desc">{name}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
