import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AnswersType, AnswersUpdateType, IAnswers } from '../../types'

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
      const newState = { ...state }
      newState[uid] = answers
      return newState
    }
  }
})

export const answersActions = answersSlice.actions
