import moment from 'moment/moment'
import { useSelector } from 'react-redux'

import { Locale, i18n } from '../locale'
import { selectUser } from '../redux/selectors'

export const useDate = () => {
  const { locale } = useSelector(selectUser)

  const { aug, sep, oct, nov, dec, jan, feb } = i18n(locale, 'month') as Locale

  const getDate = (deadline: number) =>
    moment(deadline)
      .format('D -MM- HH:mm')
      .replace('-08-', aug)
      .replace('-09-', sep)
      .replace('-10-', oct)
      .replace('-11-', nov)
      .replace('-12-', dec)
      .replace('-01-', jan)
      .replace('-02-', feb)

  return getDate
}
