import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { About } from '../../types'

type AboutLocale = { [key: string]: string }

const initialState: About = {
  ru: {} as AboutLocale,
  ua: {} as AboutLocale
}

export const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    setAbout(state, action: PayloadAction<About>) {
      const { ru, ua } = action.payload
      state.ru = ru
      state.ua = ua
    }
  }
})

export const aboutActions = aboutSlice.actions
