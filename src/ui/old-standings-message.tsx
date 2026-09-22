import { useSelector } from 'react-redux'

import { i18n } from '@/locale'
import { selectUser } from '@/redux/selectors'

export function OldStandingsMessage() {
  const { locale } = useSelector(selectUser)
  const { tableOldStandings1, tableOldStandings2, tableOldStandings3, tableOldStandings4 } = i18n(locale, 'standings')

  return (
    <div className="border leading-4 mb-1.5 mt-1 border-ink/20 rounded-xl bg-white p-2 flex flex-col gap-2 items-start">
      <span className="px-0.5 leading-4 text-sm">{tableOldStandings1}</span>
      <span className="px-0.5 leading-4 text-sm">{tableOldStandings2}</span>
      <span className="px-0.5 leading-4 text-sm">{tableOldStandings3}</span>
      <span className="px-0.5 leading-4 text-sm">{tableOldStandings4}</span>
    </div>
  )
}
