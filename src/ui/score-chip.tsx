import clsx from 'clsx'

type Props = {
  score: string
  className?: string
}

export function ScoreChip({ score, className }: Props) {
  return (
  <span
    className={clsx(
      'inline-flex items-center justify-center shrink-0 rounded-lg border border-ink/20 bg-white px-1.5 py-0.5 text-xs font-semibold leading-none text-ink tabular-nums',
      className
    )}
  >
    {score}
  </span>
)
}
