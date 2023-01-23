import { SET_MOBILE } from './types'

export const setMobile = (boolean) => {
  return {
    type: SET_MOBILE,
    payload: boolean
  }
}