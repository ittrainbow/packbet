import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IApp } from '../../types'

const initialState: IApp = {
  mobile: false,
  loading: true,
  editor: false,
  error: '',
  about: '',
  alert: false,
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
      console.log('setLoading', action.payload)
      state.loading = action.payload
    },

    setMobile(state, action: PayloadAction<boolean>) {
      console.log('setMobile')
      state.mobile = action.payload
    },

    setEditor(state, action: PayloadAction<boolean>) {
      console.log('setEditor')
      state.editor = action.payload
    },

    setError(state, action: PayloadAction<string>) {
      console.log('setError')
      state.error = action.payload
    },

    setAbout(state, action: PayloadAction<string>) {
      console.log('setAbout')
      state.about = action.payload
    },

    setAlert(state, action: PayloadAction<boolean>) {
      console.log('setAlert')
      state.alert = action.payload
    },

    setCurrentWeek(state, action: PayloadAction<number>) {
      console.log('setCurrentWeek')
      state.currentWeek = action.payload
    },

    setEmptyEditor(state, action: PayloadAction<boolean>) {
      console.log('setEmptyEditor')
      state.emptyEditor = action.payload
    },

    setIsItYou(state, action: PayloadAction<boolean>) {
      console.log('setIsItYou')
      state.isItYou = action.payload
    },

    setNextWeek(state, action: PayloadAction<number>) {
      console.log('setNextWeek')
      state.nextWeek = action.payload
    },

    setOtherUserName(state, action: PayloadAction<string>) {
      console.log('setOtherUserName')
      state.otherUserName = action.payload
    },

    setOtherUserUID(state, action: PayloadAction<string>) {
      console.log('setOtherUserUID')
      state.otherUserUID = action.payload
    },

    setSeason(state, action: PayloadAction<number>) {
      console.log('setSeason')
      state.season = action.payload
    },

    setSelectedWeek(state, action: PayloadAction<number>) {
      console.log('setSelectedWeek')
      state.selectedWeek = action.payload
    },

    setNextAndCurrentWeeks(state, action: PayloadAction<{ [key: string]: number }>) {
      console.log('setNextAndCurrentWeeks')
      state.nextWeek = action.payload.nextWeek
      state.currentWeek = action.payload.currentWeek
    },

    setTabActive(state, action: PayloadAction<number>) {
      console.log('setTabActive')
      state.tabActive = action.payload
      localStorage.setItem('contestTabActive', action.payload.toString())
    },
  }
})

export const appActions = appSlice.actions