import React from 'react'

type ButtonProps = {
  onClick: any
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

export const Button = ({ onClick, disabled = false, className, children }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} className={'button ' + className}>
      {children}
    </button>
  )
}
