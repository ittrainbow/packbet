import { Input } from './Input'

type SwitchPropsType = {
  onChange: any
  checked: boolean | undefined
  messageOn: string
  messageOff: string
  vertical?: boolean
}

export const Switch = ({ onChange, checked, messageOff, messageOn, vertical = true }: SwitchPropsType) => {
  const classes = `switch-container-${vertical ? 'vertical' : 'horizontal'}`
  return (
    <div className={classes}>
      <div className="greeting-container">{checked ? messageOn : messageOff}</div>
      <label className="switch">
        <Input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider round"></span>
      </label>
    </div>
  )
}
