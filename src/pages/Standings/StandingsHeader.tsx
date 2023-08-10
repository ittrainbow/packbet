import { useSelector } from 'react-redux'

import { selectUser } from '../../redux/selectors'
import { LocaleType } from '../../types'
import { i18n } from '../../locale'

export const StandingsHeader = () => {
  const { locale } = useSelector(selectUser)
  const { tableNameMsg, tableCorrectMsg } = i18n(locale, 'standings') as LocaleType
  return (
    <div className="standings__header">
      <div className="col-zero">#</div>
      <div className="col-one"></div>
      <div className="col-two">{tableNameMsg}</div>
      <div className="col-three">%</div>
      <div className="col-four">{tableCorrectMsg}</div>
      <div className="col-five">90%</div>
    </div>
  )
}
