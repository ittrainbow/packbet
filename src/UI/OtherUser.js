import React from 'react'

import { i18n } from '../locale/locale'
import { useAppContext } from '../context/Context'

export const OtherUser = () => {
  const { userContext, appContext, setAppContext } = useAppContext()
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

  // locale
  const { otherUser1msg, otherUser2msg, otherUser3msg } = i18n(locale, 'otheruser')

  return isItYou ? null : (
    <div>
      <button className="otheruser" onClick={setContextHandler}>
        <div className="otheruser__text">{otherUser1msg}</div>
        <div className="otheruser__text">
          {otherUser2msg}
          <b>{otherUserName}</b>
          {otherUser3msg}
        </div>
      </button>
    </div>
  )
}
