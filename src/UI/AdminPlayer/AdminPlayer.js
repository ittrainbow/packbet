import React, { useContext } from 'react'

import './AdminPlayer.scss'

import { Context } from '../../context/Context'

export const AdminPlayer = () => {
  const { userContext, setUserContext } = useContext(Context)
  const { adminAsPlayer } = userContext

  const setContextHandler = () => {
    setUserContext({ ...userContext, adminAsPlayer: !adminAsPlayer })
  }

  return (
    <label className="switch">
      <input type="checkbox" onClick={setContextHandler} />
      <span className="slider round"></span>
    </label>
  )
}
