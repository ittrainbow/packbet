import React from 'react'
import { useSelector } from 'react-redux'

import './Footer.scss'

import { LocaleSwitcher } from '../../UI'

export const Footer = () => {
  const { loading } = useSelector((state) => state)
  return (
    <div className="footer">
      <div className="footer__container">{loading ? null : <LocaleSwitcher />}</div>
    </div>
  )
}
