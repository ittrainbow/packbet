import React from 'react'
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { connect } from 'react-redux/es/exports'

import { actionSetEditorCurrentDeadline } from '../../redux/actions/editorActions'

const BasicDateTimePicker = (props) => {
  const [value, setValue] = React.useState(dayjs())

  function dateConverter(value) {
    const month = value.$M > 8 ? (value.$M + 1) : '0' + (value.$M + 1)
    const day = value.$D > 9 ? value.$D : '0' + value.$D
    const hours = value.$H > 9 ? value.$H : '0' + value.$H
    const minutes = value.$m > 9 ? value.$m : '0' + value.$m
    const time = `${value.$y}-${month}-${day} ${hours}-${minutes}`

    return time
  }

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label=""
          value={value || props.deadline}
          onChange={(newValue) => {
            setValue(newValue)
            props.setCurrentDeadline(dateConverter(newValue))
          }}
        />
      </LocalizationProvider>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    deadline: state.editor.currentDeadline,
    isEditor: state.week.editorStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentDeadline: (deadline) => dispatch(actionSetEditorCurrentDeadline(deadline))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicDateTimePicker)
