import { takeEvery, call, put } from 'redux-saga/effects'

import { UPDATE_PROFILE, USER_LOGIN, FETCH_OTHER_USER, SUBMIT_RESULTS, SUBMIT_ANSWERS } from '../types'
import { ActionType, IUser, UserUpdateType, AnswersType, IAnswers, RawUser, IUserStandings } from '../../types'
import { writeDocumentToDB, getCollectionFromDB, getDocumentFromDB } from '../../db'
import { appActions, answersActions, resultsActions, standingsActions, userActions } from '../slices'
import { objectCompare, tableCreator } from '../../helpers'

function* updateProfileSaga(action: ActionType<UserUpdateType>) {
  yield put(appActions.setLoading(true))

  const { payload } = action
  const { uid, name, locale } = payload

  try {
    const response: IUser = yield call(getDocumentFromDB, 'users', uid)
    const data = { ...response, name, locale }
    yield call(writeDocumentToDB, 'users', uid, data)
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

type FetchOtherUserActionType = {
  type: string
  payload: string
}

function* userLoginSaga(action: UserLoginActionType) {
  const uid = action.payload
  try {
    const user: IUser = yield call(getDocumentFromDB, 'users', uid)
    yield put(userActions.setUser({ ...user, adminAsPlayer: true }))

    const answers: AnswersType = yield call(getDocumentFromDB, 'answers2023', uid)
    yield put(answersActions.updateAnswers({ answers, uid }))

    const results: AnswersType = yield call(getDocumentFromDB, 'results2023', 'results')
    yield put(resultsActions.setResults(results))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

function* submitResultsSaga(action: any) {
  const results = action.payload
  try {
    const answers: IAnswers = yield call(getCollectionFromDB, 'answers2023')
    const players: { [key: string]: RawUser } = yield call(getCollectionFromDB, 'users')
    const standingsArray: IUserStandings[] = tableCreator(answers, players, results)
    const standings = Object.assign({}, standingsArray)

    yield call(writeDocumentToDB, 'results2023', 'results', results)
    yield call(writeDocumentToDB, 'results2023', 'standings', standings)
    yield put(standingsActions.setStandings(standings))
    yield put(resultsActions.setResults(results))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

function* submitAnswersSaga(action: any) {
  const { answers, uid, toaster } = action.payload

  try {
    yield call(writeDocumentToDB, 'answers2023', uid, answers[uid])
    const response: AnswersType = yield call(getDocumentFromDB, 'answers2023', uid)
    const saveSuccess = objectCompare(response, answers[uid])
    toaster(saveSuccess)
  } catch (error) {
    if (error instanceof Error) {
      yield toaster(false)
      yield put(appActions.setError(error.message))
    }
  }
}

function* fetchOtherUserSaga(action: FetchOtherUserActionType) {
  const uid = action.payload
  try {
    const response: AnswersType = yield call(getDocumentFromDB, 'answers2023', uid)
    yield put(answersActions.updateAnswers({ answers: response, uid }))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

export function* userSaga() {
  yield takeEvery(UPDATE_PROFILE, updateProfileSaga)
  yield takeEvery(USER_LOGIN, userLoginSaga)
  yield takeEvery(SUBMIT_RESULTS, submitResultsSaga)
  yield takeEvery(SUBMIT_ANSWERS, submitAnswersSaga)
  yield takeEvery(FETCH_OTHER_USER, fetchOtherUserSaga)
}
