import { useSelector } from 'react-redux'

import { i18n, Locale } from '../../locale'
import { selectUser } from '../../redux/selectors'

export const StandingsHeader = () => {
  const { locale } = useSelector(selectUser)
  const { tableNameMsg, tableCorrectMsg, tableLimitMsg } = i18n(locale, 'standings') as Locale
  return (
    <div className="standings__header">
      <div className="col jcc col-zero">#</div>
      <div className="col col-one"></div>
      <div className="col col-two">{tableNameMsg}</div>
      <div className="col jcc col-three">{tableCorrectMsg}</div>
      <div className="col jcc col-four">%</div>
      <div className="col jcc col-five col-dense">{tableLimitMsg}</div>
    </div>
  )
}
