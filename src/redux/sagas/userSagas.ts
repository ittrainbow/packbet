import { takeEvery, call, put } from 'redux-saga/effects'

import { UPDATE_PROFILE, USER_LOGIN, FETCH_OTHER_USER, SUBMIT_RESULTS, SUBMIT_ANSWERS } from '../storetypes'
import { ActionType, IUser, AnswersType, IAnswers, RawUser, IUserStandings } from '../../types'
import { writeDocumentToDB, getCollectionFromDB, getDocumentFromDB } from '../../db'
import { appActions, answersActions, resultsActions, standingsActions, userActions } from '../slices'
import { objectCompare, tableCreator } from '../../helpers'

type UserUpdateType = {
  locale: 'ua' | 'ru'
  name: string
  uid: string
}

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

function* userLoginSaga(action: ActionType<string>) {
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

type SubmitResultsType = {
  results: AnswersType
  toaster: (value: boolean) => void
}

function* submitResultsSaga(action: ActionType<SubmitResultsType>) {
  const { results, toaster } = action.payload
  yield put(appActions.setLoading(true))

  try {
    const answers: IAnswers = yield call(getCollectionFromDB, 'answers2023')
    const players: { [key: string]: RawUser } = yield call(getCollectionFromDB, 'users')
    const standingsArray: IUserStandings[] = tableCreator(answers, players, results)
    const standings = Object.assign({}, standingsArray)

    yield call(writeDocumentToDB, 'results2023', 'results', results)
    yield call(writeDocumentToDB, 'results2023', 'standings', standings)
    yield put(standingsActions.setStandings(standings))
    yield put(resultsActions.setResults(results))

    const response: AnswersType = yield call(getDocumentFromDB, 'results2023', 'results')
    const saveSuccess: boolean = yield call(objectCompare, response, results)

    yield call(toaster, saveSuccess)
  } catch (error) {
    yield toaster(false)
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }

  yield put(appActions.setLoading(false))
}

type SubmitAnswersType = {
  answers: { [key: string]: AnswersType }
  uid: string
  toaster: (value: boolean) => void
}

function* submitAnswersSaga(action: ActionType<SubmitAnswersType>) {
  const { answers, uid, toaster } = action.payload

  yield put(appActions.setLoading(true))
  try {
    yield call(writeDocumentToDB, 'answers2023', uid, answers[uid])
    const response: AnswersType = yield call(getDocumentFromDB, 'answers2023', uid)
    const saveSuccess: boolean = yield call(objectCompare, response, answers[uid])
    yield call(toaster, saveSuccess)
  } catch (error) {
    yield toaster(false)
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
  yield put(appActions.setLoading(false))
}

function* fetchOtherUserSaga(action: ActionType<string>) {
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
