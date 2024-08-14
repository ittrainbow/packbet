import { useSelector } from 'react-redux'

import { i18n, Locale } from '../../locale'
import { selectUser } from '../../redux/selectors'

export const StandingsHeader = () => {
  const { locale } = useSelector(selectUser)
  const { tableNameMsg, tableCorrectMsg, tableLimitMsg } = i18n(locale, 'standings') as Locale
  return (
    <div className="gap-0.5 grid grid-cols-[1.75rem,1.75rem,1fr,3.25rem,2.75rem,2.75rem] sm:grid-cols-[2rem,2rem,1fr,4rem,3rem,3rem] min-h-[1.875rem]">
      <div className="flex items-center bg-gray-200 text-sm justify-center rounded-md px-1 py-0 border border-gray-400">
        #
      </div>
      <div className="flex items-center bg-gray-200 text-sm justify-center rounded-md px-1 py-0 border border-gray-400"></div>
      <div className="flex items-center bg-gray-200 text-sm justify-center rounded-md px-1 py-0 border border-gray-400 tracking-tighter">
        {tableNameMsg}
      </div>
      <div className="flex items-center bg-gray-200 text-sm justify-center rounded-md px-1 py-0 border border-gray-400 tracking-tighter">
        {tableCorrectMsg}
      </div>
      <div className="flex items-center bg-gray-200 text-sm justify-center rounded-md px-1 py-0 border border-gray-400 tracking-tighter">
        %
      </div>
      <div className="flex items-center bg-gray-200 text-sm justify-center rounded-md px-1 py-0 border border-gray-400 tracking-tighter">
        {tableLimitMsg}
      </div>
    </div>
  )
}
