import { InputBase, InputLabel, MenuItem, styled } from '@mui/material'

import NativeSelect, { SelectChangeEvent } from '@mui/material/Select'
import { useSelector } from 'react-redux'
import { i18n, Locale } from '../locale'
import { selectUser } from '../redux/selectors'

type Props = {
  options: string[] | number[]
  onChange: (e: SelectChangeEvent<number | string>) => void
  value: string | number
}

const StyledInput = styled(InputBase)(() => ({
  '& .MuiInputBase-input': {
    fontSize: 15,
    padding: '2px 6px',
    color: '#394150'
  }
}))

export const SelectInput = ({ options, onChange, value }: Props) => {
  const { locale } = useSelector(selectUser)
  const { tableChooseSeason } = i18n(locale, 'standings') as Locale
  const selectors = options.map((option: any) => {
    return {
      label: option.toString(),
      value: option
    }
  })

  return (
    <div className="flex flex-wrap gap-1 h-9 items-center justify-center">
      <InputLabel style={{ fontSize: 15, color: '#394150' }}>{tableChooseSeason}:</InputLabel>
      <NativeSelect
        defaultValue={value}
        value={value}
        label="Age"
        onChange={(value) => onChange(value)}
        sx={{}}
        input={<StyledInput />}
      >
        {selectors.map((option: { label: string; value: string | number }) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </NativeSelect>
    </div>
  )
}
