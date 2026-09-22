import clsx from 'clsx'
import { FlagRu, FlagUa } from '@/icons'

type Props = {
  checked: boolean | undefined
  onChange: () => void
  messageOn?: string
  messageOff?: string
  locale?: boolean
  fullWidth?: boolean
  disabled?: boolean
  narrow?: boolean
}

export function Switch({
  onChange,
  checked,
  messageOff,
  messageOn,
  fullWidth,
  disabled = false,
  locale,
  narrow
}: Props) {
  return (
    <div
      className={clsx('items-center justify-center rounded-lg max-h-12 flex flex-row', narrow ? 'gap-0' : 'gap-1')}
      style={{ width: fullWidth ? '100%' : undefined }}
    >
      <div
        className={clsx(
          'flex justify-end px-1',
          narrow ? 'w-fit' : 'w-1/3',
          disabled ? 'text-ink-muted' : 'text-ink'
        )}
      >
        {locale ? (
          <span className="inline-flex w-6 h-[18px] border border-ink-muted rounded-[5px] overflow-hidden">
            <FlagRu className="w-full h-full" />
          </span>
        ) : (
          messageOff ?? null
        )}
      </div>
      <label
        className={clsx(
          'relative inline-flex w-14 h-8 shrink-0 items-center rounded-full border border-ink/20 bg-white',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        )}
      >
        <input
          type="checkbox"
          className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
          checked={Boolean(checked)}
          onChange={onChange}
          disabled={disabled}
        />
        <span
          className={clsx(
            'pointer-events-none absolute top-[3px] left-[3px] w-6 h-6 rounded-full border transition-transform',
            checked && 'translate-x-[22px]',
            checked && !locale ? 'bg-accent border-accent' : 'bg-ink-muted border-ink-muted'
          )}
        />
      </label>
      <div
        className={clsx('flex px-1', narrow ? 'w-fit' : 'w-1/3', disabled ? 'text-ink-muted' : 'text-ink')}
      >
        {locale ? (
          <span className="inline-flex w-6 h-[18px] border border-ink-muted rounded-[5px] overflow-hidden">
            <FlagUa className="w-full h-full" />
          </span>
        ) : (
          messageOn ?? null
        )}
      </div>
    </div>
  )
}
