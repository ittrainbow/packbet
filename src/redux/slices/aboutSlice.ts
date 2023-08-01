import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IAbout } from '../../types'

type AboutLocaleType = { [key: string]: string }

const initialState: IAbout = {
  ru: {} as AboutLocaleType,
  ua: {} as AboutLocaleType
}

export const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    setAbout(state, action: PayloadAction<IAbout>) {
      state.ru = action.payload.ru
      state.ua = action.payload.ua
    }
  }
})

export const aboutActions = aboutSlice.actions
