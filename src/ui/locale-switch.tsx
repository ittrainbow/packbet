import clsx from 'clsx'
import { FlagBe, FlagRu, FlagUa } from '../icons'
import { Locale, LocaleCode, i18n } from '../locale'

const FLAGS: { code: LocaleCode; Flag: typeof FlagRu }[] = [
  { code: 'ru', Flag: FlagRu },
  { code: 'ua', Flag: FlagUa },
  { code: 'by', Flag: FlagBe }
]

type Props = {
  value: LocaleCode
  onChange: (locale: LocaleCode) => void
}

export const LocaleSwitch = ({ value, onChange }: Props) => {
  const { profileLangMsg } = i18n(value, 'auth') as Locale

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-center">{profileLangMsg}</span>
      <div className="flex items-center justify-center gap-3" role="radiogroup" aria-label={profileLangMsg}>
        {FLAGS.map(({ code, Flag }) => {
          const selected = value === code
          return (
            <button
              key={code}
              type="button"
              aria-label={code}
              aria-pressed={selected}
              onClick={() => onChange(code)}
              className={clsx(
                'inline-flex w-8 h-6 border rounded-[5px] overflow-hidden',
                selected ? 'border-ink/40' : 'border-ink/20 opacity-40'
              )}
            >
              <Flag className="w-full h-full" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
