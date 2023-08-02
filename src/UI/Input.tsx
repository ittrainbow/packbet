import { ChangeEvent } from 'react'

type InputProps = {
  type: 'text' | 'checkbox' | 'datetime-local'
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  id?: string
  className?: string
  placeholder?: string
  inputRef?: any
  value?: string | undefined
  checked?: boolean
  sx?: { [key: string]: string }
}

export const Input = (props: InputProps) => {
  const {
    type,
    value,
    onChange,
    placeholder,
    id,
    className,
    inputRef,
    checked
  } = props
  return (
    <input
      ref={inputRef}
      type={type}
      value={value}
      checked={checked}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete='off'
      id={id}
      className={className}
    />
  )
}
