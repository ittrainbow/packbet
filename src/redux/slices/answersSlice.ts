import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AnswersUpdateType, IAnswers } from '../../types'

const initialState = {} as IAnswers

export const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    setAnswers(_, action: PayloadAction<IAnswers>) {
      return action.payload
    },

    updateAnswers(state, action: PayloadAction<AnswersUpdateType>) {
      const { answers, uid } = action.payload
      state[uid] = answers
    },

    clearAnswers() {
      return initialState
    }
  }
})

export const answersActions = answersSlice.actions
