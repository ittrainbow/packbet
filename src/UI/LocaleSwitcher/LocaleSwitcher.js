import React, { useContext } from 'react'

import './LocaleSwitcher.scss'

import { Context } from '../../App'

export const LocaleSwitcher = () => {
  const { userContext, setUserContext } = useContext(Context)
  const { locale } = userContext

  const onClickHandler = () => {
    const newLocale = locale === 'ru' ? 'ua' : 'ru'
    setUserContext({ ...userContext, locale: newLocale })
  }

  return (
    <label className="switch">
      <input type="checkbox" onClick={() => onClickHandler()} />
      <span className="slider round"></span>
    </label>
  )
}
