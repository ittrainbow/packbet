import React from 'react'

import './Button.scss'

export const Button = ({ onClick, disabled, className, children }) => {
  const cls = className ? 'button ' + className : 'button'
  return (
    <button onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}
