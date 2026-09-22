import clsx from 'clsx'
import { LegacyRef } from 'react'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

  type?: 'text' | 'checkbox' | 'datetime-local' | 'search' | 'number' | 'password' | 'email'
  sx?: { [key: string]: string }
  value?: string | undefined
  placeholder?: string
  checked?: boolean
  inputRef?: LegacyRef<HTMLInputElement>
  id?: string
  disabled?: boolean
  className?: string
  autoComplete?: string
}

export function Input({
  onChange,

  type = 'text',
  value,
  placeholder,
  id,
  className,
  inputRef,
  checked,
  disabled,
  autoComplete = 'off'
}: Props) {
  return (
    <input
      ref={inputRef}
      type={type}
      value={value}
      checked={checked}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      id={id}
      disabled={disabled}
      className={clsx(
        'flex items-center w-full h-10 text-sm p-2 border rounded-lg border-ink/20 bg-white text-ink',
        className
      )}
    />
  )
}
