import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IApp } from '../../types'

type SetStandingsType = {
  otherUserUID: string
  otherUserName: string
  tabActive: number
}

type SubmitWeekType = {
  nextWeek: number
  currentWeek: number
  newSelectedWeek: number
}

const initialState: IApp = {
  mobile: false,
  loading: true,
  editor: false,
  error: '',
  currentWeek: 0,
  emptyEditor: false,
  isItYou: true,
  nextWeek: 0,
  otherUserName: '',
  otherUserUID: '',
  selectedWeek: 0,
  tabActive: 1,
  emailReg: false,
  duration: 150
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },

    setMobile(state, action: PayloadAction<boolean>) {
      state.mobile = action.payload
    },

    setEditor(state, action: PayloadAction<boolean>) {
      state.editor = action.payload
    },

    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },

    setEmailReg(state, action: PayloadAction<boolean>) {
      state.emailReg = action.payload
    },

    setEmptyEditor(state, action: PayloadAction<boolean>) {
      state.emptyEditor = action.payload
    },

    setOtherUserName(state, action: PayloadAction<string>) {
      state.otherUserName = action.payload
    },

    setOtherUserUID(state, action: PayloadAction<string>) {
      state.otherUserUID = action.payload
    },

    clearOtherUser(state) {
      state.otherUserName = ''
      state.otherUserUID = ''
      state.isItYou = true
    },

    setSelectedWeek(state, action: PayloadAction<number>) {
      state.selectedWeek = action.payload
    },

    setNextAndCurrentWeeks(state, action: PayloadAction<{ [key: string]: number }>) {
      state.nextWeek = action.payload.nextWeek
      state.currentWeek = action.payload.currentWeek
    },

    submitWeek(state, action: PayloadAction<SubmitWeekType>) {
      const { newSelectedWeek, nextWeek, currentWeek } = action.payload
      state.selectedWeek = newSelectedWeek
      state.nextWeek = nextWeek
      state.currentWeek = currentWeek
    },

    setEditorAndTab(state) {
      state.emptyEditor = false
      state.tabActive = 5
    },

    setTabActive(state, action: PayloadAction<number>) {
      const id = action.payload
      localStorage.setItem('packContestLastTab', id.toString())
      state.tabActive = id
    },

    setOtherUserFromStandings(state, action: PayloadAction<SetStandingsType>) {
      const { otherUserName, otherUserUID } = action.payload
      state.otherUserName = otherUserName
      state.otherUserUID = otherUserUID
      state.isItYou = false
      state.tabActive = 5
    }
  }
})

export const appActions = appSlice.actions
