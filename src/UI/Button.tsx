import clsx from 'clsx'
import { ReactNode } from 'react'

type Props = {
  onClick: () => void
  disabled?: boolean
  className?: string
  minWidth?: number
  text?: string
  icon?: ReactNode
}

export const Button = ({ onClick, disabled = false, className = '', minWidth = 40, text, icon }: Props) => {
  const classes = ('button ' + className).trim()

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        classes,
        'button active:shadow disabled:not-allowed disabled:text-gray-500 active:bg-slate-300 flex pointer transition items-center justify-center box-border w-full h-10 rounded-md border border-gray-400',
        icon && 'text-[20px]'
      )}
      style={{ minWidth }}
    >
      {icon ?? text}
    </button>
  )
}
