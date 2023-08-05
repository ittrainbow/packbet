import { useSelector } from 'react-redux'

import { selectApp } from '../redux/selectors'
import { Input } from './Input'

type SwitchPropsType = {
  onChange: () => void
  checked: boolean | undefined
  messageOn: string
  messageOff: string
  width?: string
  bordered?: boolean
}

export const Switch = ({
  onChange,
  checked,
  messageOff,
  messageOn,
  width = '50%',
  bordered = true
}: SwitchPropsType) => {
  const { mobile } = useSelector(selectApp)

  const mobileMessage = checked ? messageOn : messageOff
  const border = bordered ? '1px solid #aaa' : ''
  const mobileStyle = `switch-inner-container switch-${mobile ? 'mobile' : 'desktop'}-left`

  return (
    <div className="switch-container" style={{ width, border }}>
      <div className={mobileStyle}>{mobile ? mobileMessage : messageOff}</div>
      <label className="switch">
        <Input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider round"></span>
      </label>
      {!mobile && (
        <div className="switch-inner-container" style={{ textAlign: 'left' }}>
          {messageOn}
        </div>
      )}
    </div>
  )
}
