import { take, put, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'redux-first-history'

import { appActions } from '../slices/appSlice'
import { ReduxRouterType, IStore } from '../../types'

type LocationActionType = {
  type: string
  payload: ReduxRouterType
}

export function* switchEditorSaga() {
  while (true) {
    const action: LocationActionType = yield take(LOCATION_CHANGE)
    const { pathname } = action.payload.location
    const { editor, tabActive } = yield select((store: IStore) => store.app)
    const wasEditor = tabActive > 4
    console.log(100, wasEditor)

    if (wasEditor !== editor) {
      yield put(appActions.setEditor(wasEditor))
    }
  }
}
