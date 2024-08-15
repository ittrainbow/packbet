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
  narrow?: boolean
}

export const Switch = ({
  onChange,
  checked,
  messageOff,
  messageOn,
  fullWidth,
  disabled = false,
  locale,
  narrow
}: Props) => {
  return (
    <div
      className={clsx('items-center justify-center rounded-md max-h-12 flex flex-row', narrow ? 'gap-0' : 'gap-1')}
      style={{ width: fullWidth ? '100%' : '' }}
    >
      <div className={clsx('flex justify-end px-1 text-gray-700', narrow ? 'w-fit' : 'w-1/3')}>
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
      <label className="relative inline-block border border-gray-400 min-w-14 h-8 rounded-full bg-gray-100">
        <Input
          type="checkbox"
          className="opacity-0 cursor-pointer"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <span
          className={clsx(
            'cursor-pointer before:w-[26px] before:-translate-x-0.5 before:border before:bg-gray-400 before:bg-opacity-90 before:border-gray-400 before:transition before:left-1 before:bottom-[2px] before:h-[26px] before:absolute absolute pointer transition-all top-0 bottom-0 rounded-full before:rounded-full',
            checked && 'translate-x-6'
          )}
        />
      </label>
      <div className={clsx('w-1/3 flex px-1 text-gray-700', narrow ? 'w-fit' : 'w-1/3')}>
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
