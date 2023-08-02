import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { WeekType } from '../../types'

const initialState = {} as WeekType
export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setEditor(_, action: PayloadAction<WeekType>) {
      return action.payload
    },

    // updateEditor(state, action: PayloadAction<UpdateCompareType>) {
    //   const { data, id } = action.payload
    //   state[id] = data
    // },
  }
})

export const editorActions = editorSlice.actions
