import React, { useContext } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { useAuthState } from 'react-firebase-hooks/auth'

import './LocaleSwitcher.scss'

import { Context } from '../../App'
import { auth } from '../../db'

export const LocaleSwitcher = () => {
  const [user] = useAuthState(auth)
  const { userContext, setUserContext } = useContext(Context)
  const { locale, tempLocale } = userContext

  const onClickHandler = () => {
    const newLocale = tempLocale === 'ru' ? 'ua' : 'ru'
    setUserContext({ ...userContext, locale: newLocale, tempLocale: newLocale })
  }

  const flagRu = (
    <ReactCountryFlag
      className="emojiFlag"
      countryCode="RU"
      svg
      style={{
        width: '24px',
        height: '18px',
        border: `1px solid grey`,
        borderRadius: '5px'
      }}
    />
  )
  const flagUa = (
    <ReactCountryFlag
      className="emojiFlag"
      countryCode="UA"
      svg
      style={{
        width: '24px',
        height: '18px',
        border: `1px solid grey`,
        borderRadius: '5px'
      }}
    />
  )

  return (
    <div className="locale-switcher">
      <div className="locale-flag">{flagRu}</div>
      <label className="locale-switch">
        <input type="checkbox" onClick={() => onClickHandler()} checked={tempLocale === 'ua'} />
        <span className="locale round"></span>
      </label>
      <div className="locale-flag">{flagUa}</div>
    </div>
  )
}
