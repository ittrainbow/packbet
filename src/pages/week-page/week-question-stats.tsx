import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getDBCollection } from '@/db'
import { Locale, i18n } from '@/locale'
import { selectApp, selectUser } from '@/redux/selectors'
import { AnswersStore, Store } from '@/types'
import { getQuestionStats, getQuestionText } from '@/utils'

type Props = {
  outdated: boolean
}

export const WeekQuestionStats = ({ outdated }: Props) => {
  const { locale } = useSelector(selectUser)
  const { selectedWeek } = useSelector(selectApp)
  const weeks = useSelector((store: Store) => store.weeks)
  const results = useSelector((store: Store) => store.results)
  const questions = weeks[selectedWeek]?.questions
  const weekResults = results[selectedWeek]
  const hasResults = Boolean(weekResults && Object.keys(weekResults).length)

  const [answers, setAnswers] = useState<AnswersStore | null>(null)
  const [loading, setLoading] = useState(false)

  const { weekStatsTitle, weekStatsCorrect, weekStatsLoading } = i18n(locale, 'week') as Locale

  useEffect(() => {
    if (!outdated || !hasResults) {
      setAnswers(null)
      return
    }

    let cancelled = false
    setLoading(true)

    getDBCollection('answers')
      .then((data) => {
        if (!cancelled) setAnswers(data as AnswersStore)
      })
      .catch(() => {
        if (!cancelled) setAnswers({})
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [outdated, hasResults, selectedWeek, weekResults])

  if (!outdated || !hasResults) return null

  const stats = answers ? getQuestionStats(selectedWeek, weekResults, answers) : []

  return (
    <div className="grid gap-1.5">
      <span className="font-bold text-base leading-6">{weekStatsTitle}</span>
      {loading || !answers ? (
        <span className="text-sm text-ink-muted">{weekStatsLoading}</span>
      ) : (
        <div className="grid gap-1">
          {stats.map((row, index) => {
            const question = questions?.[row.id]
            const text = question ? getQuestionText(question, locale) : `#${row.id}`
            const isBest = index === 0
            const isWorst = index === stats.length - 1 && stats.length > 1
            return (
              <div
                key={row.id}
                className="flex items-baseline gap-2 px-1.5 py-1.5 border border-ink/20 rounded-xl bg-white"
              >
                <span className="grow min-w-0 text-sm leading-4 truncate">{text.trim()}</span>
                <span
                  className={
                    isBest || isWorst
                      ? 'shrink-0 text-sm font-semibold tabular-nums'
                      : 'shrink-0 text-sm tabular-nums text-ink-muted'
                  }
                >
                  {row.correct}/{row.answered} {weekStatsCorrect}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
