import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IApp } from '../../types'

type SetStandingsType = {
  otherUserUID: string
  otherUserName: string
  isItYou: boolean
  tabActive: number
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
  season: 2023,
  selectedWeek: 0,
  tabActive: 1
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

    setEmptyEditor(state, action: PayloadAction<boolean>) {
      state.emptyEditor = action.payload
    },

    setIsItYou(state, action: PayloadAction<boolean>) {
      state.isItYou = action.payload
    },

    setOtherUserName(state, action: PayloadAction<string>) {
      state.otherUserName = action.payload
    },

    setOtherUserUID(state, action: PayloadAction<string>) {
      state.otherUserUID = action.payload
    },

    setSelectedWeek(state, action: PayloadAction<number>) {
      state.selectedWeek = action.payload
    },

    setNextAndCurrentWeeks(state, action: PayloadAction<{ [key: string]: number }>) {
      state.nextWeek = action.payload.nextWeek
      state.currentWeek = action.payload.currentWeek
    },

    setTabActive(state, action: PayloadAction<number>) {
      state.tabActive = action.payload
    },

    setHeader(state, action: PayloadAction<{ id: number; selectedWeek: number; emptyEditor: boolean }>) {
      const { id, selectedWeek, emptyEditor } = action.payload
      state.tabActive = id
      state.selectedWeek = selectedWeek
      state.emptyEditor = emptyEditor
    },

    setOtherUserFromStandings(state, action: PayloadAction<SetStandingsType>) {
      const { otherUserName, otherUserUID, isItYou, tabActive } = action.payload
      state.otherUserName = otherUserName
      state.otherUserUID = otherUserUID
      state.isItYou = isItYou
      state.tabActive = tabActive
    }
  }
})

export const appActions = appSlice.actions
