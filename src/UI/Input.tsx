type InputProps = {
  type: 'text' | 'checkbox' | 'datetime-local'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  className?: string
  placeholder?: string
  ref?: any
  value?: string | undefined
  checked?: boolean
  sx?: { [key: string]: string }
}

export const Input = (props: InputProps) => {
  const { type, value, onChange, placeholder, id, className, ref, checked } = props
  return (
    <input
      ref={ref}
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
