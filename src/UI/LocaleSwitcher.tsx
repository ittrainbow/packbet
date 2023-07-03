import ReactCountryFlag from 'react-country-flag'

import { Input } from './Input'

type LocaleSwitcherProps = {
  onChange: () => void
  checked: boolean
}

export const LocaleSwitcher = ({ onChange, checked }: LocaleSwitcherProps) => {
  const flag = (countryCode: string) => (
    <ReactCountryFlag
      className="emojiFlag"
      countryCode={countryCode}
      svg
      style={{
        width: '24px',
        height: '18px',
        border: `1px solid grey`,
        borderRadius: '5px'
      }}
    />
  )

  return (
    <div className="locale-switcher">
      <div className="locale-flag">{flag('RU')}</div>
      <label className="locale-switch">
        <Input type="checkbox" onChange={onChange} checked={checked} />
        <span className="locale round"></span>
      </label>
      <div className="locale-flag">{flag('UA')}</div>
    </div>
  )
}
