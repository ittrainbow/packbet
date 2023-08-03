import { useDispatch, useSelector } from 'react-redux'

import { Input } from './Input'
import { selectUser } from '../redux/selectors'

type SwitchPropsType = {
  onChange: any
  checked: boolean | undefined
  messageOn: string
  messageOff: string
}

export const Switch = ({ onChange, checked, messageOff, messageOn }: SwitchPropsType) => {
  return (
    <div className="switch-container">
      <div className="greeting-container">{checked ? messageOn : messageOff}</div>
      <label className="switch">
        <Input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider round"></span>
      </label>
    </div>
  )
}
