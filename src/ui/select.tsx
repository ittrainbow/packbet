import { i18n } from '@/locale'
import { selectUser } from '@/redux/selectors'
import { useSelector } from 'react-redux'

type Props = {
  options: string[] | number[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  value: string | number
}

export function SelectInput({ options, onChange, value }: Props) {
  const { locale } = useSelector(selectUser)
  const { tableChooseSeason } = i18n(locale, 'standings')

  return (
    <div className="flex flex-wrap gap-1 h-9 items-center justify-center">
      <label className="text-[15px] text-ink" htmlFor="season-select">
        {tableChooseSeason}:
      </label>
      <select
        id="season-select"
        value={value}
        onChange={onChange}
        className="h-8 rounded-lg border border-ink/20 bg-white px-1.5 text-[15px] text-ink"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
