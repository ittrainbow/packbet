import clsx from 'clsx'
import { ReactNode } from 'react'

type Props = {
  onClick: () => void
  disabled?: boolean
  className?: string
  minWidth?: number
  text?: string
  icon?: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export const Button = ({ onClick, disabled = false, className = '', text, icon, size }: Props) => {
  return (
    <button
      onClick={!disabled ? () => onClick() : undefined}
      disabled={disabled}
      className={clsx(
        'button active:shadow min-w-10 disabled:not-allowed disabled:text-gray-500 active:bg-gray-300 flex transition items-center justify-center box-border w-full h-10 rounded-lg border border-gray-400',
        icon && 'text-[1.25rem]',
        size === 'xs' && 'text-sm h-6',
        size === 'sm' && 'text-sm h-8',
        size === 'md' && 'text-md h-10',
        size === 'lg' && 'text-lg h-12',
        !disabled && 'hover:shadow hover:bg-gray-200 ',
        className
      )}
    >
      {icon ?? text}
    </button>
  )
}
