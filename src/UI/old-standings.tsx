import { useSelector } from 'react-redux'

import { i18n, Locale } from '../locale'
import { selectUser } from '../redux/selectors'

export const OldStandings = () => {
  const { locale } = useSelector(selectUser)
  const { tableOldStandings1, tableOldStandings2, tableOldStandings3, tableOldStandings4 } = i18n(
    locale,
    'standings'
  ) as Locale

  return (
    <div className="border leading-4 mb-1.5 mt-1 border-gray-400 rounded-md bg-gray-200 p-2 flex flex-col gap-2 items-start">
      <span className="px-0.5 leading-4 text-sm">{tableOldStandings1}</span>
      <span className="px-0.5 leading-4 text-sm">{tableOldStandings2}</span>
      <span className="px-0.5 leading-4 text-sm">{tableOldStandings3}</span>
      <span className="px-0.5 leading-4 text-sm">{tableOldStandings4}</span>
    </div>
  )
}
