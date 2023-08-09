import { FaInfoCircle, FaUserAlt, FaFootballBall, FaCalendarAlt } from 'react-icons/fa'
import { FaClipboardList, FaChevronCircleRight, FaPenNib } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { memo } from 'react'

import { selectApp, selectUser, selectLocation } from '../redux/selectors'
import { appActions, editorActions } from '../redux/slices'
import { LocaleType } from '../types'
import { i18n } from '../locale'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { mobile, tabActive, nextWeek, currentWeek, editor } = useSelector(selectApp)
  const { admin, locale } = useSelector(selectUser)
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
      id > 4 && !editor && dispatch(appActions.setEditor(id > 4))
      id < 5 && editor && dispatch(appActions.setEditor(false))
      id === 5 && dispatch(editorActions.clearEditor())
      id === 6 && dispatch(appActions.setSelectedWeek(nextWeek))

      navigate(path)
    }, 200)

    localStorage.setItem('packContestLastTab', id.toString())
  }

  // render styles and locales

  const getClass = (id: number) => {
    return id === tabActive ? 'header__tab-active' : 'header__tab'
  }

  const headerLocale = i18n(locale, 'header') as LocaleType
  const { tab0msg, tab1msg, tab2msg, tab3msg, tab4msg, tab5msg, tab6msg } = headerLocale

  const userMenu = [
    { path: '/', name: tab0msg, icon: <FaInfoCircle />, id: 0 },
    { path: '/userpage', name: tab1msg, icon: <FaUserAlt />, id: 1 },
    { path: '/week', name: tab2msg, icon: <FaFootballBall />, id: 2 },
    { path: '/season', name: tab3msg, icon: <FaCalendarAlt />, id: 3 },
    { path: '/standings', name: tab4msg, icon: <FaClipboardList />, id: 4 }
  ]

  const adminMenu = [
    { path: '/calendar', name: tab5msg, icon: <FaChevronCircleRight />, id: 5 },
    { path: '/editor', name: tab6msg, icon: <FaPenNib />, id: 6 }
  ]

  const bar = admin ? [...userMenu, ...adminMenu] : userMenu

  return (
    <div className="header">
      <div className="header__icons">
        {bar.map((el) => {
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

export const MemoHeader = memo(Header)
