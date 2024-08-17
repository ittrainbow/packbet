import { useSelector } from 'react-redux'

import clsx from 'clsx'
import { i18n, Locale } from '../../locale'
import { selectTools, selectUser } from '../../redux/selectors'

export const StandingsHeader = () => {
  const { locale } = useSelector(selectUser)
  const { seasonSelected } = useSelector(selectTools)
  const { tableNameMsg, tableCorrectMsg, tableLimitMsg, tableAllMsg } = i18n(locale, 'standings') as Locale
  return (
    <div
      className={clsx(
        'gap-0.5 grid min-h-[1.875rem]',
        seasonSelected === 2022
          ? 'grid-cols-[1.75rem,1fr,3.25rem,2.75rem,2.75rem] sm:grid-cols-[2rem,1fr,4rem,3.5rem,3.5rem]'
          : 'grid-cols-[1.75rem,1.75rem,1fr,3.25rem,2.75rem,2.75rem] sm:grid-cols-[2rem,2rem,1fr,4rem,3.5rem,3.5rem]'
      )}
    >
      <div className="flex items-center bg-gray-200 text-sm sm:text-base justify-center rounded-md px-1 py-0 border border-gray-400">
        #
      </div>
      {seasonSelected !== 2022 && (
        <div className="flex items-center bg-gray-200 text-sm sm:text-base justify-center rounded-md px-1 py-0 border border-gray-400"></div>
      )}
      <div className="flex items-center bg-gray-200 text-sm sm:text-base justify-center rounded-md px-1 py-0 border border-gray-400 tracking-tighter">
        {tableNameMsg}
      </div>
      <div className="flex items-center bg-gray-200 text-sm sm:text-base justify-center rounded-md px-1 py-0 border border-gray-400 tracking-tighter">
        {seasonSelected === 2022 ? tableAllMsg : tableCorrectMsg}
      </div>
      <div className="flex items-center bg-gray-200 text-sm sm:text-base justify-center rounded-md px-1 py-0 border border-gray-400 tracking-tighter">
        {seasonSelected === 2022 ? tableCorrectMsg : '%'}
      </div>

      <div className="flex items-center bg-gray-200 text-sm  sm:text-base justify-center rounded-md px-1 py-0 border border-gray-400 tracking-tighter">
        {seasonSelected === 2022 ? '%' : tableLimitMsg}
      </div>
    </div>
  )
}
