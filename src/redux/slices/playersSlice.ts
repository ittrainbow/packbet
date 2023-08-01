import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IPlayers, IUser } from '../../types'

const initialState = {} as IPlayers

type UpdateUserPayloadType = {
  uid: string,
  newUser: IUser
}

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers(_, action: PayloadAction<IPlayers>) {
      return action.payload
    },

    addPlayer(state, action: PayloadAction<UpdateUserPayloadType>) {
      const { uid, newUser } = action.payload
      const newState = { ...state }
      newState[uid] = newUser
      return newState
    }
  }
})

export const playersActions = playersSlice.actions
