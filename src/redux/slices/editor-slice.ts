import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'

import { emptyQuestion } from '../../constants'
import { IEditor, QuestionType, WeekType } from '../../types'

const initialState: IEditor = {
  questions: {},
  name: '',
  active: false,
  deadline: new Date().getTime(),
  questionInWork: emptyQuestion,
  questionCompare: {} as QuestionType
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setEditor(state, action: PayloadAction<WeekType>) {
      const { questions, name, active, deadline } = action.payload
      state.questions = questions
      state.name = name
      state.active = active
      state.deadline = deadline
    },

    updateEditorQuestions(state, action: PayloadAction<number>) {
      state.questions[action.payload] = state.questionInWork
      state.questionInWork = emptyQuestion
    },

    deleteEditorQuestion(state, action: PayloadAction<number>) {
      const { questions } = structuredClone(current(state))
      delete questions[action.payload]
      state.questions = questions
    },

    updateEditorName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },

    updateEditorDeadline(state, action: PayloadAction<number>) {
      state.deadline = action.payload
    },

    updateEditorWeekActivity(state, action: PayloadAction<boolean>) {
      state.active = action.payload
    },

    initQuestionInWork(state, action: PayloadAction<QuestionType>) {
      const { payload } = action
      state.questionInWork = payload
      state.questionCompare = payload
    },

    setQuestionInWork(state, action: PayloadAction<QuestionType>) {
      state.questionInWork = action.payload
    },

    clearQuestionInWork(state) {
      state.questionInWork = emptyQuestion
    },

    clearEditor() {
      return initialState
    }
  }
})

export const editorActions = editorSlice.actions
