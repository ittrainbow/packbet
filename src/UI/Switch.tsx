import { Input } from './Input'

type SwitchPropsType = {
  checked: boolean | undefined
  onChange: () => void
  messageOn: string
  messageOff: string
  fullWidth?: boolean
}

export const Switch = ({ onChange, checked, messageOff, messageOn, fullWidth }: SwitchPropsType) => {
  return (
    <div className="switch-container" style={{ width: fullWidth ? '100%' : '' }}>
      <div className="switch-inner-container inner-left">{messageOff}</div>
      <label className="switch">
        <Input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider round"></span>
      </label>
      <div className="switch-inner-container" style={{ textAlign: 'left' }}>
        {messageOn}
      </div>
    </div>
  )
}
