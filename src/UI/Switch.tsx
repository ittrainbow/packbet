import { useSelector } from 'react-redux'

import { Input } from './Input'
import { selectApp } from '../redux/selectors'

type SwitchPropsType = {
  onChange: () => void
  checked: boolean | undefined
  messageOn: string
  messageOff: string
  fullWidth?: boolean
  bordered?: boolean
}

export const Switch = ({ onChange, checked, messageOff, messageOn, fullWidth, bordered = true }: SwitchPropsType) => {
  const { mobile } = useSelector(selectApp)
  const border = bordered ? '1px solid #aaa' : ''

  return (
    <div
      className="switch-container"
      style={{ width: fullWidth ? '100%' : '', border, padding: mobile ? '' : '5px 0' }}
    >
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
