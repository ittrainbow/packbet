import * as React from 'react'
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { connect } from 'react-redux/es/exports'
import { actionSetEditorCurrentDeadline } from '../../redux/actions/editorActions'

const BasicDateTimePicker = (props) => {
  const [value, setValue] = React.useState(dayjs())

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label=""
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          const month = newValue.$M > 9 ? newValue.$M : '0'+newValue.$M
          const day = newValue.$D > 9 ? newValue.$D : '0'+newValue.$D
          const hours = newValue.$H > 9 ? newValue.$H : '0'+newValue.$H
          const minutes = newValue.$m > 9 ? newValue.$m : '0'+newValue.$m
          const deadline = `${newValue.$y}-${month}-${day} ${hours}-${minutes}`
          props.setCurrentDeadline(deadline)
        }}
      />
    </LocalizationProvider>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentDeadline: (deadline) => dispatch(actionSetEditorCurrentDeadline(deadline)),
  }
}

export default connect(null, mapDispatchToProps)(BasicDateTimePicker)