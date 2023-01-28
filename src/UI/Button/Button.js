import React from 'react'
import { useSelector } from 'react-redux'

import './Button.scss'

export const Button = (props) => {
  const { children, onClick, disabled, className } = props
  const { mobile } = useSelector((state) => state)

  const clsName = () => {
    const style = [className]
    style.push(mobile ? 'button__mobile' : 'button')
    return style.join(' ')
  }

  return (
    <button className={clsName()} onClick={() => onClick()} disabled={disabled}>
      {children}
    </button>
  )
}
