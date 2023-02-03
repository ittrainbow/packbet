import React, { useContext } from 'react'
import ReactCountryFlag from 'react-country-flag'

import './LocaleSwitcher.scss'

import { Context } from '../../App'

export const LocaleSwitcher = () => {
  const { userContext, setUserContext } = useContext(Context)
  const { locale, tempLocale } = userContext

  const onClickHandler = () => {
    const newLocale = tempLocale === 'ru' ? 'ua' : 'ru'
    setUserContext({ ...userContext, tempLocale: newLocale })
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
      <div className="locale-flag">{locale === 'ru' ? flagRu : flagUa}</div>
      <label className="locale-switch">
        <input type="checkbox" onClick={() => onClickHandler()} />
        <span className="locale round"></span>
      </label>
      <div className="locale-flag">{locale === 'ru' ? flagUa : flagRu}</div>
    </div>
  )
}
