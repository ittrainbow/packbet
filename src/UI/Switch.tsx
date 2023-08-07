import { useSelector } from 'react-redux'

import { Input } from './Input'
import { selectApp } from '../redux/selectors'

type SwitchPropsType = {
  onChange: () => void
  checked: boolean | undefined
  messageOn: string
  messageOff: string
  fullWidth?: boolean
}

export const Switch = ({ onChange, checked, messageOff, messageOn, fullWidth }: SwitchPropsType) => {
  const { mobile } = useSelector(selectApp)

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
