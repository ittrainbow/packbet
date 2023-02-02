import React, { useContext } from 'react'

import './AdminPlayer.scss'

import { Context } from '../../App'

export const AdminPlayer = () => {
  const { userContext, setUserContext } = useContext(Context)
  const { adminAsPlayer } = userContext

  const onClickHandler = () => {
    setUserContext({ ...userContext, adminAsPlayer: !adminAsPlayer })
  }

  return (
    <label className="switch">
      <input type="checkbox" onClick={() => onClickHandler()} />
      <span className="slider round"></span>
    </label>
  )
}
