import React from 'react'

import { useAppContext } from '../context/Context'

export const AdminPlayer = () => {
  const { userContext, setUserContext } = useAppContext()
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
