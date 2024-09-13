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

export const Button = ({ onClick, disabled = false, className = '', text, icon }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'button active:shadow min-w-10 disabled:not-allowed disabled:text-gray-500 active:bg-slate-300 flex transition items-center justify-center box-border w-full h-10 rounded-md border border-gray-400',
        icon && 'text-[1.25rem]',
        className
      )}
    >
      {icon ?? text}
    </button>
  )
}
