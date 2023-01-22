import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { actionSetEditorCurrentDeadline } from '../../redux/actions/editorActions'

export const BasicDateTimePicker = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState(dayjs())
  const { currentDeadline } = useSelector(state => state.editor)

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
          value={value || new Date(currentDeadline).getTime()}
          onChange={(newValue) => {
            setValue(newValue)
            dispatch(actionSetEditorCurrentDeadline(dateConverter(newValue)))
          }}
        />
      </LocalizationProvider>
    </div>
  )
}
