import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { menuItem } from './menuItem'
// import { useAuthState } from 'react-firebase-hooks/auth'

// import { auth, logout } from '../../db/'
// import { Context } from '../../App'

// import './Header.css'

export const Header = () => {
  const [tabActive, setTabActive] = useState(0)
  const navigate = useNavigate()
  // const [user] = useAuthState(auth)
  // const { context, countdown, setCountdown } = useContext(Context)
  // const { name } = context
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (countdown > 0) {
  //     const cdown = setInterval(() => setCountdown(countdown - 1), 1000)
  //     return clearInterval(cdown)
  //   }
  // }, [countdown])

  // const loggedInButtons = () => {
  //   return (
  //     <>
  //       <button className="button" onClick={() => navigate('/dashboard')}>
  //         Dashboard
  //       </button>
  //       <button className="button" onClick={() => logOutHandler()}>
  //         Log Out
  //       </button>
  //     </>
  //   )
  // }

  // const outsideUserButtons = () => {
  //   return (
  //     <>
  //       <button className="button" onClick={() => navigate('/login')}>
  //         Login
  //       </button>
  //       <button className="button" onClick={() => navigate('/register')}>
  //         Register
  //       </button>
  //     </>
  //   )
  // }

  // const logOutHandler = () => {
  //   logout()
  //   navigate('/')
  // }

  const clickHandler = (id, path) => {
    setTabActive(id)
    navigate(path)
  }

  return (
    <div>
      <div className="SidebarMobile">
        <table>
          <thead>
            <tr>
              {menuItem.map((item, index) => {
                const { id, path } = item
                return (
                  <td key={index} onClick={() => clickHandler(id, path)}>
                    <div className="headerIcon">{item.icon}</div>
                  </td>
                )
              })}
            </tr>
          </thead>
        </table>
      </div>
      {/* <main className="MainMobile">{children}</main> */}
    </div>
  )
}
