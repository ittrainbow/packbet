import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import './Header.scss'

import { userMenu, adminMenu } from '../../templates/_menuItems'
import { Context } from '../../App'
import { auth } from '../../db'

export const Header = () => {
  const [user] = useAuthState(auth)
  const { mobile } = useSelector((state) => state)
  const { appContext, setAppContext, userContext } = useContext(Context)
  const { admin } = userContext
  const { tabActive } = appContext
  const navigate = useNavigate()

  const isTabActive = (id) => id === tabActive

  const clickHandler = (id, path) => {
    if (!isTabActive(id)) {
      setAppContext({ ...appContext, tabActive: id })
      navigate(path)
    }
  }

  const getClass = (id) =>
    isTabActive(id)
      ? 'header__tab-active'
      : !user && id === 1
      ? 'header__tab-no-login'
      : 'header__tab'

  const bar = user && admin ? userMenu.concat(adminMenu) : userMenu

  return (
    <div className={mobile ? 'header-mobile' : 'header'}>
      <div className="header__icons">
        {bar.map((el) => {
          const { id, path, icon, name } = el
          return (
            <div key={id} className={getClass(id)} onClick={() => clickHandler(id, path)}>
              {icon}
              <div className="header__name">{mobile ? null : name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
