import React, { useContext } from 'react'

import './OtherUser.scss'

import { Context } from '../../App'
import { i18n } from '../../locale/locale'

export const OtherUser = () => {
  const { userContext, appContext, setAppContext } = useContext(Context)
  const { otherUserName, isItYou } = appContext
  const { locale } = userContext

  const setContextHandler = () => {
    setAppContext({
      ...appContext,
      isItYou: true,
      otherUserName: null,
      otherUserUID: null
    })
  }

  
  const { otherUser1msg, otherUser2msg } = i18n(locale, 'otheruser')

  return isItYou ? null : (
    <div>
      <button className="otheruser" onClick={setContextHandler}>
        {otherUser1msg}
        <b>{otherUserName}</b>
        {otherUser2msg}
      </button>
    </div>
  )
}
