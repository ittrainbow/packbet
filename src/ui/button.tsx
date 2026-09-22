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

export function Button({ onClick, disabled = false, className = '', text, icon, size }: Props) {
  const iconOnly = Boolean(icon) && !text
  const height = size === 'xs' ? 'h-6' : size === 'sm' ? 'h-8' : size === 'lg' ? 'h-12' : 'h-10'

  return (
    <button
      onClick={!disabled ? () => onClick() : undefined}
      disabled={disabled}
      className={clsx(
        'disabled:cursor-not-allowed disabled:text-ink-muted flex items-center justify-center box-border rounded-lg border border-ink/20 bg-white',
        'transition-[transform,color,background-color,border-color] duration-150 ease-out active:scale-95 disabled:active:scale-100',
        height,
        iconOnly ? 'w-10 text-[1.25rem]' : 'w-full min-w-10',
        icon && text && 'gap-2 text-sm',
        (size === 'xs' || size === 'sm') && 'text-sm',
        size === 'lg' && 'text-lg',
        className
      )}
    >
      {icon}
      {text}
    </button>
  )
}
