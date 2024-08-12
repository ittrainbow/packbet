import { ChangeInput } from '../types'

type Props = {
  type?: 'text' | 'checkbox' | 'datetime-local' | 'search' | 'number'
  onChange: (e: ChangeInput) => void
  sx?: { [key: string]: string }
  value?: string | undefined
  placeholder?: string
  className?: string
  checked?: boolean
  inputRef?: any
  id?: string
  disabled?: boolean
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
      className={className}
    />
  )
}
