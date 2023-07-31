import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AppStateType = {
  mobile: boolean
  loading: boolean
  editor: boolean
  error: string
}

const initialState: AppStateType = {
  mobile: false,
  loading: true,
  editor: false,
  error: ''
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
    }
  }
})

export const appActions = appSlice.actions