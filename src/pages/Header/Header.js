import React, { useContext, useEffect } from 'react'
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

// import { userMenu, adminMenu } from './menuItems'
import { Context } from '../../App'
import { setEditor } from '../../redux/actions'
import { headerLocale } from '../../locale'

export const Header = () => {
  const { mobile, editor } = useSelector((state) => state)
  const { appContext, setAppContext, userContext } = useContext(Context)
  const { admin, locale } = userContext
  const { tabActive, nextWeek, currentWeek, selectedWeek, } = appContext
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { tab0msg, tab1msg, tab2msg, tab3msg, tab4msg, tab5msg, tab6msg} = headerLocale(locale)
  
  const userMenu = [
    { path: '/', name: tab0msg, icon: <FaInfoCircle className="header__icon-padding"/>, id: 0 },
    { path: '/userpage', name: tab1msg, icon: <FaUserAlt className="header__icon-padding" />, id: 1 },
    { path: '/week', name: tab2msg, icon: <FaFootballBall className="header__icon-padding" />, id: 2 },
    { path: '/calendar', name: tab3msg, icon: <FaCalendarAlt className="header__icon-padding" />, id: 3 },
    { path: '/standings', name: tab4msg, icon: <FaListUl className="header__icon-padding" />, id: 4 },
  ]
  
  const adminMenu = [
    { path: '/calendar', name: tab5msg, icon: <FaChevronCircleRight className="header__icon-padding" />, id: 5 },
    { path: '/editor', name: tab6msg, icon: <FaPenNib className="header__icon-padding" />, id: 6 }
  ]

  useEffect(() => {
    navigate('/userpage')
    setAppContext({ ...appContext, tabActive: 1 }) // eslint-disable-next-line
  }, [])

  const isTabActive = (id) => id === tabActive

  const clickHandler = (id, path) => {
    const context = {
      ...appContext,
      tabActive: id,
      selectedWeek: id === 2 ? currentWeek : id === 6 ? nextWeek : selectedWeek,
      emptyEditor: id === 6 ? true : false
    }
    setAppContext(context)
    navigate(path)

    if (editor && id <= 4) dispatch(setEditor(false))
    if (!editor && id >= 5) dispatch(setEditor(true))
  }

  const getClass = (id) => {
    if (isTabActive(id)) return mobile ? 'header-mobile__tab-active' : 'header__tab-active'
    if (!isTabActive(id)) return mobile ? 'header-mobile__tab' : 'header__tab'
  }

  const bar = admin ? userMenu.concat(adminMenu) : userMenu

  function renderBar() {
    return bar.map((el) => {
      const { id, path, icon, name } = el
      return (
        <div key={id} className={getClass(id)} onClick={() => clickHandler(id, path)}>
          {icon}
          <div className="header__name">{mobile ? null : name}</div>
        </div>
      )
    })
  }

  return (
    <div className={mobile ? 'header-mobile' : 'header'}>
      <div className="header__icons">{renderBar()}</div>
    </div>
  )
}
