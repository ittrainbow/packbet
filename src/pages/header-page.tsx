import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import clsx from 'clsx'
import { useMenu } from '../hooks'
import { selectApp, selectLocation } from '../redux/selectors'
import { appActions, editorActions, toolsActions } from '../redux/slices'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { tabActive, nextWeek, currentWeek, editor, duration } = useSelector(selectApp)
  const { pathname } = useSelector(selectLocation)

  const animateBackToWeeklist = () => {
    const backToWeeklist = pathname.includes('week') || pathname.includes('editor')
    const container = document.querySelector('.container')
    backToWeeklist && container?.classList.add('animate-fade-out-down')
  }

  const handleClick = (id: number, path: string) => {
    if (id === tabActive) return

    dispatch(appActions.setTabActive(id))

    if (id === 3 || id === 5) animateBackToWeeklist()

    setTimeout(() => {
      id === 2 && dispatch(appActions.setSelectedWeek(currentWeek))
      id > 4 && !editor && dispatch(appActions.setEditor(true)) && dispatch(editorActions.clearEditor())
      id < 5 && editor && dispatch(appActions.setEditor(false))
      id === 4 && tabActive !== 4 && dispatch(toolsActions.setShowTools(false))
      id === 5 && dispatch(editorActions.clearEditor())
      id === 6 && dispatch(appActions.setSelectedWeek(nextWeek))

      navigate(path)
    }, duration)
  }

  const menu = useMenu()

  return (
    <div className="bg-black h-[4.5rem] sm:h-[6rem] p-2 justify-between">
      <div className="flex flex-wrap max-w-[31rem]">
        {menu.map((el) => {
          const { id, path, icon, name } = el
          return (
            <div
              key={id}
              className={clsx(
                'grow flex flex-col justify-center cursor-pointer items-center transition-all gap-1 w-8 sm:w-16',
                id === tabActive ? 'text-green-600' : 'text-gray-200'
              )}
              onClick={() => handleClick(id, path)}
            >
              <div className={clsx('pt-[5px] sm:pt-1.5 text-[2.75rem] sm:text-[3rem]')}>{icon}</div>
              <div
                className={clsx(
                  'hidden sm:flex text-sm transition-all',
                  id === tabActive ? 'text-green-600' : 'text-white'
                )}
              >
                {name}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
