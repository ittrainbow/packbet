import { useSelector } from 'react-redux'

import { i18n } from '@/locale'
import { selectTools, selectUser } from '@/redux/selectors'
import { standingsGridClass } from './standings-grid'

type Props = {
  onSortPercent: () => void
  onSortLimit: () => void
  limitSortEnabled: boolean
}

const cellClass =
  'flex items-center bg-white text-sm sm:text-base justify-center rounded-lg px-1 py-0 border border-ink/20 tracking-tighter'

export function StandingsHeader({ onSortPercent, onSortLimit, limitSortEnabled }: Props) {
  const { locale } = useSelector(selectUser)
  const { seasonSelected } = useSelector(selectTools)
  const { tableNameMsg, tableCorrectMsg, tableLimitMsg, tableAllMsg } = i18n(locale, 'standings')
  const canSort = seasonSelected !== 2022

  return (
    <div className={standingsGridClass(seasonSelected)}>
      <span className={cellClass}>#</span>
      {seasonSelected !== 2022 && <span className={cellClass} />}
      <span className={cellClass}>{tableNameMsg}</span>
      <span className={cellClass}>{seasonSelected === 2022 ? tableAllMsg : tableCorrectMsg}</span>

      {canSort ? (
        <button type="button" onClick={onSortPercent} className={`${cellClass} cursor-pointer select-none`}>
          %
        </button>
      ) : (
        <span className={cellClass}>{seasonSelected === 2022 ? tableCorrectMsg : '%'}</span>
      )}

      {seasonSelected === 2022 ? (
        <span className={cellClass}>%</span>
      ) : limitSortEnabled ? (
        <button type="button" onClick={onSortLimit} className={`${cellClass} cursor-pointer select-none`}>
          {tableLimitMsg}
        </button>
      ) : (
        <span className={cellClass}>{tableLimitMsg}</span>
      )}
    </div>
  )
}
