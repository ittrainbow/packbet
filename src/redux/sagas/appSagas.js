import { take, put, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'redux-first-history'
import { SET_EDITOR } from '../types'

export function* switchEditorSaga() {
  while (true) {
    const action = yield take(LOCATION_CHANGE)
    const { pathname } = action.payload.location
    const { editor } = yield select((store) => store.app)
    const wasEditor = ['/editor', '/calendar'].includes(pathname)

    if (wasEditor !== editor) {
      yield put({ type: SET_EDITOR, payload: wasEditor })
    }
  }
}
