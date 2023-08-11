import { ChangeInputType } from '../types'

type InputProps = {
  type?: 'text' | 'checkbox' | 'datetime-local' | 'search' | 'number'
  onChange: (e: ChangeInputType) => void
  sx?: { [key: string]: string }
  value?: string | undefined
  placeholder?: string
  className?: string
  checked?: boolean
  inputRef?: any
  id?: string
}

export const Input = (props: InputProps) => {
  const { type = 'text', value, onChange, placeholder, id, className, inputRef, checked } = props
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
      className={className}
    />
  )
}
