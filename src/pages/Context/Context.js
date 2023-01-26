import React, { useEffect, useContext } from 'react'

import { Context } from '../../App'

export const ContextLog = () => {
  const { weeksContext, appContext, userContext } = useContext(Context)

  useEffect(() => {
    console.log('context:')
    console.log('weeks', weeksContext)
    console.log('app', appContext)
    console.log('user', userContext)
    return
  }, [])

  return (
    <div className="container">
      Context Log
    </div>
  )
}
