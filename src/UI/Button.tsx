import { ReactNode } from 'react'

type ButtonProps = {
  onClick: () => void
  disabled?: boolean
  className?: string
  minWidth?: number
  children: ReactNode
}

export const Button = ({ onClick, disabled = false, className = '', children, minWidth = 40 }: ButtonProps) => {
  const classes = ('button ' + className).trim()

  return (
    <button onClick={onClick} disabled={disabled} className={classes} style={{ minWidth }}>
      {children}
    </button>
  )
}
