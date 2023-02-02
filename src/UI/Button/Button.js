import React from 'react'

import './Button.scss'

export const Button = ({ onClick, disabled, className, children }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  )
}
