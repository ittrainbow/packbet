import clsx from 'clsx'
import ReactCountryFlag from 'react-country-flag'
import { Input } from './input'

type Props = {
  checked: boolean | undefined
  onChange: () => void
  messageOn?: string
  messageOff?: string
  locale?: boolean
  fullWidth?: boolean
  disabled?: boolean
}

export const Switch = ({ onChange, checked, messageOff, messageOn, fullWidth, disabled = false, locale }: Props) => {
  return (
    <div
      className="items-center justify-center rounded max-h-12 flex flex-row gap-1"
      style={{ width: fullWidth ? '100%' : '' }}
    >
      <div className="w-1/3 flex justify-end px-1 text-gray-700">
        {locale ? (
          <ReactCountryFlag
            countryCode={'ru'}
            svg
            style={{
              width: '24px',
              height: '18px',
              border: `1px solid grey`,
              borderRadius: '5px'
            }}
          />
        ) : (
          messageOff ?? null
        )}
      </div>
      <label className={clsx('relative inline-block border border-gray-400 min-w-14 h-8 rounded-full bg-gray-100')}>
        <Input type="checkbox" className="opacity-0" checked={checked} onChange={onChange} disabled={disabled} />
        <span
          className={clsx(
            'slider before:w-6 before:border before:bg-green-600 before:bg-opacity-90 before:border-gray-400 before:transition before:left-1 before:bottom-[3px] before:h-6 before:absolute absolute pointer transition-all top-0 bottom-0 rounded-full before:rounded-full',
            checked && 'translate-x-5'
          )}
        />
      </label>
      <div className="w-1/3 flex px-1 text-gray-700">
        {locale ? (
          <ReactCountryFlag
            countryCode={'ua'}
            svg
            style={{
              width: '24px',
              height: '18px',
              border: `1px solid grey`,
              borderRadius: '5px'
            }}
          />
        ) : (
          messageOn ?? null
        )}
      </div>
    </div>
  )
}
