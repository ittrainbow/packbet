import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IAnswers } from '../../types'

const initialState = {} as IAnswers

export const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    setAnswers(state, action: PayloadAction<IAnswers>) {
      return action.payload
    },
    
    updateAnswers(state, action: PayloadAction<IAnswers>) {
      return state
    }
  }
})

export const answersActions = answersSlice.actions
