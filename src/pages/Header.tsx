import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { appActions, editorActions, toolsActions } from '../redux/slices'
import { selectApp, selectLocation } from '../redux/selectors'
import { useMenu } from '../hooks'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { mobile, tabActive, nextWeek, currentWeek, editor, duration } = useSelector(selectApp)
  const { pathname } = useSelector(selectLocation)

  // container fade animations

  const animateBackToWeeklist = () => {
    const backToWeeklist = pathname.includes('week') || pathname.includes('editor')
    const container = document.querySelector('.container')
    backToWeeklist && container?.classList.add('animate-fade-out-down')
  }

  // action handlers

  const handleClick = (id: number, path: string) => {
    id !== tabActive && dispatch(appActions.setTabActive(id))

    if (id === 3 || id === 5) animateBackToWeeklist()

    setTimeout(() => {
      id === 2 && dispatch(appActions.setSelectedWeek(currentWeek))
      id > 4 && !editor && dispatch(appActions.setEditor(true))
      id < 5 && editor && dispatch(appActions.setEditor(false)) && dispatch(editorActions.clearEditor())
      id === 4 && tabActive !== 4 && dispatch(toolsActions.setShowTools(false))
      id === 5 && dispatch(editorActions.clearEditor())
      id === 6 && dispatch(appActions.setSelectedWeek(nextWeek))

      navigate(path)
    }, duration)
  }

  // render styles and locales

  const getClass = (id: number) => {
    return id === tabActive ? 'header__tab-active' : 'header__tab'
  }

  const menu = useMenu()

  return (
    <div className="header">
      <div className="header__icons">
        {menu.map((el) => {
          const { id, path, icon, name } = el
          return (
            <div key={id} className={getClass(id)} onClick={() => handleClick(id, path)}>
              <div className="header__icon-padding">{icon}</div>
              <div className="header__message">{mobile ? null : name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
