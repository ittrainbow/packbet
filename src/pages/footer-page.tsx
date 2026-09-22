import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import clsx from 'clsx'
import { useMenu } from '@/hooks'
import { selectApp } from '@/redux/selectors'
import { appActions, editorActions, toolsActions } from '@/redux/slices'

export function Footer() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { tabActive, nextWeek, currentWeek, editor, duration } = useSelector(selectApp)

  const handleClick = (id: number, path: string) => {
    if (id === tabActive) return

    dispatch(appActions.setFading('down'))
    dispatch(appActions.setTabActive(id))

    setTimeout(() => {
      id === 2 && dispatch(appActions.setSelectedWeek(currentWeek))
      id > 4 && !editor && dispatch(appActions.setEditor(true)) && dispatch(editorActions.clearEditor())
      id < 5 && editor && dispatch(appActions.setEditor(false))
      id === 4 && tabActive !== 4 && dispatch(toolsActions.setShowTools(false))
      id === 5 && dispatch(editorActions.clearEditor())
      id === 6 && dispatch(appActions.setSelectedWeek(nextWeek))

      dispatch(appActions.setFading(false))
      navigate(path)
    }, duration)
  }

  const menu = useMenu()

  return createPortal(
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 bg-white rounded-t-[16px] border border-b-0 border-ink/15 px-2 pb-[env(safe-area-inset-bottom,0px)]"
      aria-label="Main"
    >
      <div className="flex w-full max-w-[32rem] h-[var(--tabbar-height)] mx-auto">
        {menu.map((el) => {
          const { id, path, icon, name } = el
          return (
            <button
              key={id}
              className={clsx(
                'grow h-full flex flex-col justify-center items-center gap-1 w-8 sm:w-16',
                id === tabActive ? 'text-accent' : 'text-ink-muted'
              )}
              onClick={() => handleClick(id, path)}
            >
              <div className="text-[40px] leading-none">{icon}</div>
              <span className="hidden sm:flex text-sm leading-none">{name}</span>
            </button>
          )
        })}
      </div>
    </nav>,
    document.body
  )
}
