import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AnswersType, IAnswers } from '../../types'

type AnswersUpdateType = {
  answers: AnswersType
  uid: string
}

type SingleAnswerUpdateType = {
  selectedWeek: number
  id: number
  uid: string
  answer: number
}

type SingleAnswerDeleteType = {
  selectedWeek: number
  id: number
  uid: string
}
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

    updateSingleAnswer(state, action: PayloadAction<SingleAnswerUpdateType>) {
      const { selectedWeek, uid, id, answer } = action.payload
      if (!state[uid]) state[uid] = {}
      if (!state[uid][selectedWeek]) state[uid][selectedWeek] = {}
      state[uid][selectedWeek][id] = answer
    },

    deleteSingleAnswer(state, action: PayloadAction<SingleAnswerDeleteType>) {
      const { selectedWeek, uid, id } = action.payload
      if (Object.keys(state[uid][selectedWeek]).length === 1) {
        delete state[uid][selectedWeek]
      } else {
        delete state[uid][selectedWeek][id]
      }
    },
    clearAnswers() {
      return initialState
    }
  }
})

export const answersActions = answersSlice.actions
