import { useSelector, useDispatch } from 'react-redux'
import ReactCountryFlag from 'react-country-flag'

import { selectUser } from '../redux/selectors'
import { userActions } from '../redux/slices'
import { Input } from './Input'

export const LocaleSwitcher = () => {
  const dispatch = useDispatch()
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

  const handleLocaleChange = () => {
    const newLocale = locale === 'ru' ? 'ua' : 'ru'
    dispatch(userActions.setLocale(newLocale))
  }

  return (
    <div className="locale-switcher">
      <div className="locale-flag">{flag('RU')}</div>
      <label className="locale-switch">
        <Input type="checkbox" onChange={handleLocaleChange} checked={locale === 'ua'} />
        <span className="locale round"></span>
      </label>
      <div className="locale-flag">{flag('UA')}</div>
    </div>
  )
}
