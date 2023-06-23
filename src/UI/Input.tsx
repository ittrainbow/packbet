
type InputProps = {
  type: 'text' | 'checkbox' | 'datetime-local'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  className?: string
  placeholder?: string
  inputRef?: any
  value?: string | undefined
  checked?: boolean
  sx?: { [key: string]: string }
}

export const Input = (props: InputProps) => {
  const { type, value, onChange, placeholder, id, className, inputRef, checked } = props
  return (
    <input
      ref={inputRef}
      type={type}
      value={value}
      checked={checked}
      onChange={onChange}
      placeholder={placeholder}
      id={id}
      className={className}
    />
  )
}
