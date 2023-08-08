import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  FaInfoCircle,
  FaUserAlt,
  FaFootballBall,
  FaCalendarAlt,
  FaClipboardList,
  FaChevronCircleRight,
  FaPenNib
} from 'react-icons/fa'

import { i18n } from '../locale'
import { selectApp, selectUser } from '../redux/selectors'
import { LocaleType } from '../types'
import { appActions, editorActions } from '../redux/slices'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { mobile, tabActive, nextWeek, currentWeek, editor, emptyEditor, selectedWeek } = useSelector(selectApp)
  const { admin, locale, name } = useSelector(selectUser)

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
    {
      path: '/calendar',
      name: tab5msg,
      icon: <FaChevronCircleRight />,
      id: 5
    },
    { path: '/editor', name: tab6msg, icon: <FaPenNib />, id: 6 }
  ]

  const clickHandler = (id: number, path: string) => {
    dispatch(appActions.setTabActive(id))

    setTimeout(() => {
      if (id === 2 || id === 6)
        dispatch(appActions.setSelectedWeek(id === 2 ? currentWeek : id === 6 ? nextWeek : selectedWeek))

      if ((id === 6 && !emptyEditor) || (id !== 6 && emptyEditor)) dispatch(appActions.setEmptyEditor(!emptyEditor))

      id > 4 && !editor && dispatch(appActions.setEditor(true))
      id < 5 && editor && dispatch(appActions.setEditor(false))

      if (id === 6) {
        dispatch(appActions.setEmptyEditor(emptyEditor))
        dispatch(editorActions.clearEditor())
      }

      localStorage.setItem('packContestLastTab', id.toString())

      navigate(path)
    }, 200)
  }

  const getClass = (id: number) => {
    return id === 1 && !name ? 'header__no-login' : id === tabActive ? 'header__tab-active' : 'header__tab'
  }

  const bar = admin ? [...userMenu, ...adminMenu] : userMenu

  return (
    <div className="header">
      <div className="header__icons">
        {bar.map((el) => {
          const { id, path, icon, name } = el
          return (
            <div key={id} className={getClass(id)} onClick={() => clickHandler(id, path)}>
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
