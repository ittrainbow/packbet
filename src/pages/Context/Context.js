import React, { useEffect, useContext } from 'react'

import { Context } from '../../App'
import { auth } from '../../db'

export const ContextLog = () => {
  const {weeksContext} = useContext(Context)
  const {appContext} = useContext(Context)
  // const {userContext} = useContext(Context)
  // const {answersContext} = useContext(Context)

  useEffect(() => {
    console.log('context for', auth.currentUser.uid)
    console.log('weeks', weeksContext)
    console.log('app', appContext)
    // console.log('user', userContext)
    // console.log('answers', answersContext)
    return
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container">
      Context Log
    </div>
  )
}
