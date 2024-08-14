import { InputBase, styled } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import NativeSelect, { SelectChangeEvent } from '@mui/material/Select'

type Props = {
  options: string[] | number[]
  onChange: (e: SelectChangeEvent<number | string>) => void
  value: string | number
}

const StyledInput = styled(InputBase)(() => ({
  '& .MuiInputBase-input': {
    fontSize: 16,
    padding: '2px 6px',
    '&:focus': {}
  }
}))

export const SelectInput = ({ options, onChange, value }: Props) => {
  const selectors = options.map((option: any) => {
    return {
      label: option.toString(),
      value: option
    }
  })

  return (
    <div className="flex flex-wrap gap-1 h-9 items-center justify-center">
      <InputLabel>Выберите сезон</InputLabel>
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
