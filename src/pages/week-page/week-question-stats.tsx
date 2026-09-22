import { useSelector } from 'react-redux'

import { i18n } from '@/locale'
import { selectApp, selectUser } from '@/redux/selectors'
import { Store } from '@/types'
import { fromQuestionStatsRecord, getQuestionText } from '@/utils'

type Props = {
  outdated: boolean
}

export function WeekQuestionStats({ outdated }: Props) {
  const { locale } = useSelector(selectUser)
  const { selectedWeek } = useSelector(selectApp)
  const weeks = useSelector((store: Store) => store.weeks)
  const results = useSelector((store: Store) => store.results)
  const questions = weeks[selectedWeek]?.questions
  const weekResults = results[selectedWeek]
  const hasResults = Boolean(weekResults && Object.keys(weekResults).length)
  const stats = fromQuestionStatsRecord(weeks[selectedWeek]?.questionStats)

  const { weekStatsTitle, weekStatsQuestionCol, weekStatsAnswersCol } = i18n(locale, 'week')

  if (!outdated || !hasResults || !stats.length) return null

  return (
    <div className="grid gap-1.5 w-full min-w-0">
      <span className="font-bold text-base leading-6">{weekStatsTitle}</span>
      <div className="grid gap-1 w-full min-w-0">
        <div className="flex items-baseline gap-2 px-1.5 w-full min-w-0">
          <span className="grow min-w-0 text-sm font-semibold leading-4">{weekStatsQuestionCol}</span>
          <span className="shrink-0 text-sm font-semibold leading-4">{weekStatsAnswersCol}</span>
        </div>
        {stats.map((row, index) => {
          const question = questions?.[row.id]
          const text = question ? getQuestionText(question, locale) : `#${row.id}`
          const isBest = index === 0
          const isWorst = index === stats.length - 1 && stats.length > 1
          return (
            <div
              key={row.id}
              className="flex items-baseline gap-2 px-1.5 py-1.5 border border-ink/20 rounded-xl bg-white w-full min-w-0 overflow-hidden box-border"
            >
              <span className="grow min-w-0 text-sm leading-4 truncate">{text.trim()}</span>
              <span
                className={
                  isBest || isWorst
                    ? 'shrink-0 text-sm font-semibold tabular-nums'
                    : 'shrink-0 text-sm tabular-nums text-ink-muted'
                }
              >
                {row.correct}/{row.answered}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
