import { takeEvery, call, put } from 'redux-saga/effects'

import { UPDATE_PROFILE, UPDATE_STANDINGS, USER_LOGIN, FETCH_OTHER_USER } from '../types'
import { ActionType, IUser, UserUpdateType, AnswersType, IAnswers, RawUser, IUserStandings } from '../../types'
import {
  getNameFromFirestore, writeNameToFirestore,
  getDataOnUserLogin, fetchDataFromFirestore, writeStandingsToFirestore
} from '../../db'
import { appActions, answersActions, resultsActions, standingsActions } from '../slices'
import { tableCreator } from '../../helpers'

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

function* updateStandingsSaga(action: any) {
  const results = action.payload
  const answers: IAnswers = yield call(fetchDataFromFirestore, 'answers2023')
  const players: { [key: string]: RawUser } = yield call(fetchDataFromFirestore, 'users')
  const standings: IUserStandings[] = tableCreator(answers, players, results)
  const standingsObject = Object.assign({}, standings)
  yield call(writeStandingsToFirestore, standingsObject)
  yield put(standingsActions.setStandings(standings))
}

export function* userSaga() {
  yield takeEvery(UPDATE_PROFILE, updateProfileSaga)
  yield takeEvery(USER_LOGIN, userLoginSaga)
  yield takeEvery(UPDATE_STANDINGS, updateStandingsSaga)
  yield takeEvery(FETCH_OTHER_USER, updateStandingsSaga)
}
