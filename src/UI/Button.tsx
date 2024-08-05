import { ReactNode } from 'react'

type Props = {
  onClick: () => void
  disabled?: boolean
  className?: string
  minWidth?: number
  children: ReactNode
}

export const Button = ({ onClick, disabled = false, className = '', children, minWidth = 40 }: Props) => {
  const classes = ('button ' + className).trim()

  return (
    <button onClick={onClick} disabled={disabled} className={classes} style={{ minWidth }}>
      {children}
    </button>
  )
}
