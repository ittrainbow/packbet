import clsx from 'clsx'
import { LegacyRef } from 'react'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

  type?: 'text' | 'checkbox' | 'datetime-local' | 'search' | 'number'
  sx?: { [key: string]: string }
  value?: string | undefined
  placeholder?: string
  checked?: boolean
  inputRef?: LegacyRef<HTMLInputElement>
  id?: string
  disabled?: boolean
  className?: string
}

export const Input = ({
  onChange,

  type = 'text',
  value,
  placeholder,
  id,
  className,
  inputRef,
  checked,
  disabled
}: Props) => {
  return (
    <input
      ref={inputRef}
      type={type}
      value={value}
      checked={checked}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete="off"
      id={id}
      disabled={disabled}
      className={clsx('flex items-center w-full h-10 font-sm p-2 border rounded-lg border-gray-400', className)}
    />
  )
}
