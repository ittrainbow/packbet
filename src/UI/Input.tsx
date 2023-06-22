type InputProps = {
  type: 'text' | 'checkbox' | 'datetime-local'
  value: string | undefined
  onChange: () => void
  placeholder: string
  id?: string
  className?: string
  ref?: any
  checked?: boolean
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
