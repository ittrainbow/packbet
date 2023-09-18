import { useSelector } from 'react-redux'

import { selectUser } from '../../redux/selectors'
import { i18n, LocaleType } from '../../locale'

export const StandingsHeader = () => {
  const { locale } = useSelector(selectUser)
  const { tableNameMsg, tableCorrectMsg, tableLimitMsg } = i18n(locale, 'standings') as LocaleType
  return (
    <div className="standings__header">
      <div className="col-zero">#</div>
      <div className="col-one"></div>
      <div className="col-two">{tableNameMsg}</div>
      <div className="col-three">{tableCorrectMsg}</div>
      <div className="col-four">%</div>
      <div className="col-five col-dense">{tableLimitMsg}</div>
    </div>
  )
}
