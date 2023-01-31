import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import './Header.scss'

import { userMenu, adminMenu } from './menuItems'
import { Context } from '../../App'
import { auth } from '../../db'
import { setEditor } from '../../redux/actions'

export const Header = () => {
  const [user] = useAuthState(auth)
  const { mobile, editor } = useSelector((state) => state)
  const { appContext, setAppContext, userContext } = useContext(Context)
  const { admin } = userContext
  const { tabActive, nextWeek, currentWeek, selectedWeek } = appContext
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    navigate('/userpage')
    setAppContext({ ...appContext, tabActive: 1 })
    // eslint-disable-next-line
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

  const getClass = (id) =>
    isTabActive(id)
      ? 'header__tab-active'
      : !user && id === 1
      ? 'header__tab-no-login'
      : 'header__tab'

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
