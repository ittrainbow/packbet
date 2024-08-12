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
  'label + &': {
    // paddingHorizontal: 12
  },
  '& .MuiInputBase-input': {
    // borderRadius: 4,
    // position: 'relative',
    // backgroundColor: theme.palette.background.paper,
    // border: '1px solid #ced4da',
    fontSize: 15,
    padding: '2px 8px 2px 8px',
    // backgroundColor: 'white',
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // fontFamily: [
    //   '-apple-system',
    //   'BlinkMacSystemFont',
    //   '"Segoe UI"',
    //   'Roboto',
    //   '"Helvetica Neue"',
    //   'Arial',
    //   'sans-serif',
    //   '"Apple Color Emoji"',
    //   '"Segoe UI Emoji"',
    //   '"Segoe UI Symbol"'
    // ].join(','),
    '&:focus': {
      // borderRadius: 4,
      // borderColor: '#80bdff',
      // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
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
    <div className="select-input">
      <InputLabel className="select-season">Выберите сезон</InputLabel>
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
