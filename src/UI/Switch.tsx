import { Input } from '.'

type SwitchPropsType = {
  checked: boolean | undefined
  onChange: () => void
  messageOn: string
  messageOff: string
  fullWidth?: boolean
  disabled?: boolean
}

export const Switch = ({ onChange, checked, messageOff, messageOn, fullWidth, disabled = false }: SwitchPropsType) => {
  return (
    <div className="switch-container flexrow5" style={{ width: fullWidth ? '100%' : '' }}>
      {!!messageOff.length && <div className="switch-inner-container inner-left">{messageOff}</div>}
      <label className="switch">
        <Input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
        <span className="slider round"></span>
      </label>
      {!!messageOn.length && (
        <div className="switch-inner-container inner-right" style={{ textAlign: 'left' }}>
          {messageOn}
        </div>
      )}
    </div>
  )
}
