import React, { useContext } from 'react'
import ReactCountryFlag from 'react-country-flag'

import './LocaleSwitcher.scss'

import { Context } from '../../App'

export const LocaleSwitcher = () => {
  const { userContext, setUserContext } = useContext(Context)
  const { locale } = userContext

  const onChangeHandler = () => {
    const newLocale = locale === 'ru' ? 'ua' : 'ru'
    localStorage.setItem('locale', newLocale)
    setUserContext({ ...userContext, locale: newLocale })
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
        <input type="checkbox" onChange={onChangeHandler} checked={locale === 'ua'} />
        <span className="locale round"></span>
      </label>
      <div className="locale-flag">{flagUa}</div>
    </div>
  )
}
