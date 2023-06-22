import { take, put, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'redux-first-history'

import { SET_EDITOR } from '../types'

type LocationActionType = {
  type: string
  payload: {
    action: string
    location: { [key: string]: string }
  }
}

export function* switchEditorSaga() {
  while (true) {
    const action: LocationActionType = yield take(LOCATION_CHANGE)
    const { pathname } = action.payload.location
    const { editor } = yield select((store) => store.app)
    const wasEditor = ['/editor', '/calendar'].includes(pathname)

    if (wasEditor !== editor) {
      yield put({ type: SET_EDITOR, payload: wasEditor })
    }
  }
}
