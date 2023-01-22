import React, { useState } from 'react'
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { connect } from 'react-redux/es/exports'

import { actionSetEditorCurrentDeadline } from '../../redux/actions/editorActions'

export const BasicDateTimePicker = (props) => {
  const [value, setValue] = useState(dayjs())

  function dateConverter(newValue) {
    const time = new Date(newValue).getTime()

    return time
  }

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label=""
          ampm={false}
          value={value || new Date(props.deadline).getTime()}
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

connect(mapStateToProps, mapDispatchToProps)(BasicDateTimePicker)
