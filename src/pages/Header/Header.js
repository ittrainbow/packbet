import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  FaInfoCircle,
  FaUserAlt,
  FaFootballBall,
  FaCalendarAlt,
  FaListUl,
  FaChevronCircleRight,
  FaPenNib
} from 'react-icons/fa'

import './Header.scss'

import { useAppContext } from '../../context/Context'
import { setEditor } from '../../redux/actions'
import { i18n } from '../../locale/locale'
import { initialEditorContext } from '../../context/initialContexts'

export const Header = () => {
  const { mobile, editor } = useSelector((store) => store.app)
  const { appContext, setAppContext, userContext, setEditorContext } = useAppContext()
  const { admin, locale, name } = userContext
  const { tabActive, nextWeek, currentWeek, selectedWeek } = appContext
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // console.log(history)

  // locale
  const { tab0msg, tab1msg, tab2msg, tab3msg, tab4msg, tab5msg, tab6msg } = i18n(locale, 'header')

  const userMenu = [
    { path: '/', name: tab0msg, icon: <FaInfoCircle />, id: 0 },
    { path: '/userpage', name: tab1msg, icon: <FaUserAlt />, id: 1 },
    { path: '/week', name: tab2msg, icon: <FaFootballBall />, id: 2 },
    { path: '/calendar', name: tab3msg, icon: <FaCalendarAlt />, id: 3 },
    { path: '/standings', name: tab4msg, icon: <FaListUl />, id: 4 }
  ]

  const adminMenu = [
    { path: '/calendar', name: tab5msg, icon: <FaChevronCircleRight />, id: 5 },
    { path: '/editor', name: tab6msg, icon: <FaPenNib />, id: 6 }
  ]

  useEffect(() => {
    navigate('/userpage') // eslint-disable-next-line
  }, [])

  const clickHandler = (id, path) => {
    const context = {
      ...appContext,
      tabActive: id,
      selectedWeek: id === 2 ? currentWeek : id === 6 ? nextWeek : selectedWeek,
      emptyEditor: id === 6 ? true : false
    }
    setAppContext(context)
    navigate(path)

    id <= 4 && editor && dispatch(setEditor(false))
    id >= 5 && !editor && dispatch(setEditor(true))
    id === 6 && setEditorContext(initialEditorContext)
  }

  const getClass = (id) => {
    return id === 1 && !name
      ? 'header__no-login'
      : id === tabActive
      ? 'header__tab-active'
      : 'header__tab'
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

export const MemoHeader = React.memo(Header)