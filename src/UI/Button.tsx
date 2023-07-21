import { ReactNode } from 'react'

type ButtonProps = {
  onClick: () => void
  disabled?: boolean
  className?: string
  children: ReactNode
}

export const Button = ({ onClick, disabled = false, className, children }: ButtonProps) => {
  const classes = className ? 'button ' + className : 'button'
  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
