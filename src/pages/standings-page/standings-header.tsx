import { useSelector } from 'react-redux'

import { i18n, Locale } from '@/locale'
import { selectTools, selectUser } from '@/redux/selectors'
import { standingsGridClass } from './standings-grid'

export const StandingsHeader = () => {
  const { locale } = useSelector(selectUser)
  const { seasonSelected } = useSelector(selectTools)
  const { tableNameMsg, tableCorrectMsg, tableLimitMsg, tableAllMsg } = i18n(locale, 'standings') as Locale
  return (
    <div className={standingsGridClass(seasonSelected)}>
      <span className="flex items-center bg-white text-sm sm:text-base justify-center rounded-lg px-1 py-0 border border-ink/20">
        #
      </span>
      {seasonSelected !== 2022 && (
        <span className="flex items-center bg-white text-sm sm:text-base justify-center rounded-lg px-1 py-0 border border-ink/20"></span>
      )}
      <span className="flex items-center bg-white text-sm sm:text-base justify-center rounded-lg px-1 py-0 border border-ink/20 tracking-tighter">
        {tableNameMsg}
      </span>
      <span className="flex items-center bg-white text-sm sm:text-base justify-center rounded-lg px-1 py-0 border border-ink/20 tracking-tighter">
        {seasonSelected === 2022 ? tableAllMsg : tableCorrectMsg}
      </span>
      <span className="flex items-center bg-white text-sm sm:text-base justify-center rounded-lg px-1 py-0 border border-ink/20 tracking-tighter">
        {seasonSelected === 2022 ? tableCorrectMsg : '%'}
      </span>

      <span className="flex items-center bg-white text-sm  sm:text-base justify-center rounded-lg px-1 py-0 border border-ink/20 tracking-tighter">
        {seasonSelected === 2022 ? '%' : tableLimitMsg}
      </span>
    </div>
  )
}
