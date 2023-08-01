import { takeEvery, call, put } from 'redux-saga/effects'

import { UPDATE_PROFILE, USER_LOGIN } from '../types'
import { ActionType, IUser, UserUpdateType, AnswersType } from '../../types'
import { getNameFromFirestore, writeNameToFirestore, getDataOnUserLogin } from '../../db'
import { appActions, answersActions, resultsActions } from '../slices'

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

type UserLoginActionType = {
  type: string
  payload: string
}

type UserLoginResponseType = {
  answers: AnswersType
  results: AnswersType
}

function* userLoginSaga(action: UserLoginActionType) {
  const { payload } = action
  try {
    const response: UserLoginResponseType = yield call(getDataOnUserLogin, payload)
    const { answers, results } = response

    yield put(answersActions.updateAnswers({ answers, uid: payload }))
    yield put(resultsActions.setResults(results))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

export function* userSaga() {
  yield takeEvery(UPDATE_PROFILE, updateProfileSaga)
  yield takeEvery(USER_LOGIN, userLoginSaga)
}
