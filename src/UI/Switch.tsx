import { Input } from '.'

type SwitchPropsType = {
  checked: boolean | undefined
  onChange: () => void
  messageOn: string
  messageOff: string
  fullWidth?: boolean
}

export const Switch = ({ onChange, checked, messageOff, messageOn, fullWidth }: SwitchPropsType) => {
  return (
    <div className="switch-container flexrow5" style={{ width: fullWidth ? '100%' : '' }}>
      {!!messageOff.length && <div className="switch-inner-container inner-left">{messageOff}</div>}
      <label className="switch">
        <Input type="checkbox" checked={checked} onChange={onChange} />
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
