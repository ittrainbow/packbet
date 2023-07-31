import { takeEvery, call, put } from 'redux-saga/effects'

import { UPDATE_PROFILE } from '../types'
import { ActionType, IUser, UserUpdateType } from '../../types'
import { getNameFromFirestore, writeNameToFirestore } from '../../db'
import { appActions } from '../slices/appSlice'

function* updateProfileSaga(action: ActionType<UserUpdateType>) {
  yield put(appActions.setLoading(true))

  const { payload } = action
  const { uid, name, locale } = payload

  try {
    const response: IUser = yield call(getNameFromFirestore, uid)
    const data = { ...response, name, locale }
    yield call(writeNameToFirestore, { uid, data })
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }

  yield put(appActions.setLoading(false))
}

export function* userSaga() {
  yield takeEvery(UPDATE_PROFILE, updateProfileSaga)
}
