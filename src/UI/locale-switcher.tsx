import ReactCountryFlag from 'react-country-flag'
import { useSelector } from 'react-redux'

import { Input } from '.'
import { selectUser } from '../redux/selectors'

type Props = {
  profilePage?: boolean
  checked?: boolean
  onChange: () => void
}

export const LocaleSwitcher = ({ onChange, profilePage = false, checked }: Props) => {
  const { locale } = useSelector(selectUser)
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
        <Input type="checkbox" onChange={onChange} checked={profilePage ? checked : locale === 'ua'} />
        <span className="locale round"></span>
      </label>
      <div className="locale-flag">{flag('UA')}</div>
    </div>
  )
}
