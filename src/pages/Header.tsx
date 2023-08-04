import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as ico from 'react-icons/fa'

import { i18n } from '../locale'
import { selectApp, selectUser } from '../redux/selectors'
import { LocaleType } from '../types'
import { appActions, editorActions } from '../redux/slices'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const app = useSelector(selectApp)
  const { mobile, tabActive, nextWeek, currentWeek, editor } = app
  const { admin, locale, name } = useSelector(selectUser)

  const headerLocale = i18n(locale, 'header') as LocaleType
  const { tab0msg, tab1msg, tab2msg, tab3msg, tab4msg, tab5msg, tab6msg } = headerLocale

  const userMenu = [
    { path: '/', name: tab0msg, icon: <ico.FaInfoCircle />, id: 0 },
    { path: '/userpage', name: tab1msg, icon: <ico.FaUserAlt />, id: 1 },
    { path: '/week', name: tab2msg, icon: <ico.FaFootballBall />, id: 2 },
    { path: '/season', name: tab3msg, icon: <ico.FaCalendarAlt />, id: 3 },
    { path: '/standings', name: tab4msg, icon: <ico.FaListUl />, id: 4 }
  ]

  const adminMenu = [
    {
      path: '/calendar',
      name: tab5msg,
      icon: <ico.FaChevronCircleRight />,
      id: 5
    },
    { path: '/editor', name: tab6msg, icon: <ico.FaPenNib />, id: 6 }
  ]

  const clickHandler = (id: number, path: string) => {
    const selectedWeek = id === 2 ? currentWeek : id === 6 ? nextWeek : app.selectedWeek
    const emptyEditor = id === 6 ? true : false

    id === 5 && !editor && dispatch(appActions.setEditor(true))
    id === 3 && editor && dispatch(appActions.setEditor(false))

    if (currentWeek || currentWeek === 0 || id !== 2) {
      dispatch(appActions.setHeader({ id, selectedWeek, emptyEditor }))
      navigate(path)
    }

    if (id === 6) {
      dispatch(appActions.setEmptyEditor(emptyEditor))
      dispatch(editorActions.clearEditor())
    }

    localStorage.setItem('packContextLastTab', id.toString())
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
