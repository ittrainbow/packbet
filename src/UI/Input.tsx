import clsx from 'clsx'
import { LegacyRef } from 'react'

type Props = {
  type?: 'text' | 'checkbox' | 'datetime-local' | 'search' | 'number'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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
  type = 'text',
  value,
  onChange,
  placeholder,
  id,
  className,
  inputRef,
  checked,
  disabled
}: Props) => {
  const num = type === 'number'

  return (
    <input
      style={{ width: num ? 66 : '', textAlign: num ? 'center' : 'left' }}
      ref={inputRef}
      type={type}
      value={value}
      checked={checked}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete="off"
      id={id}
      disabled={disabled}
      className={clsx('flex items-center w-full h-10 font-sm p-2 border rounded-md border-gray-400', className)}
    />
  )
}
