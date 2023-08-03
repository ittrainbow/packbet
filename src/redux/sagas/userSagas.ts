import { takeEvery, call, put, select } from 'redux-saga/effects'

import { UPDATE_PROFILE, USER_LOGIN, FETCH_OTHER_USER, SUBMIT_RESULTS, SUBMIT_ANSWERS } from '../storetypes'
import { ActionType, IUser, AnswersType, IStore } from '../../types'
import { writeDBDocument, getDBDocument, updateDBDocument } from '../../db'
import { appActions, answersActions, resultsActions, userActions, compareActions } from '../slices'
import { objectCompare } from '../../helpers'

type UserUpdateType = {
  locale: 'ua' | 'ru'
  name: string
  uid: string
}

type SubmitResultsType = {
  results: AnswersType
  toaster: (value: boolean) => void
  selectedWeek: number
}

type SubmitAnswersType = {
  selectedWeek: number
  answers: { [key: string]: AnswersType }
  uid: string
  toaster: (value: boolean) => void
  firstData: boolean
}

function* updateProfileSaga(action: ActionType<UserUpdateType>) {
  yield put(appActions.setLoading(true))

  const { payload } = action
  const { uid, name, locale } = payload

  try {
    const response: IUser = yield call(getDBDocument, 'users', uid)
    const data = { ...response, name, locale }
    yield call(writeDBDocument, 'users', uid, data)
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }

  yield put(appActions.setLoading(false))
}

type UserLoginType = {
  uid: string
  displayName: string
  email: string
}

function* userLoginSaga(action: ActionType<UserLoginType>) {
  const { uid, displayName, email } = action.payload
  try {
    const responseUser: IUser = yield call(getDBDocument, 'users', uid)
    const user = responseUser || { name: displayName, email, admin: false }
    yield put(userActions.setUser(user.admin ? { ...user, adminAsPlayer: true } : user))

    const answers: AnswersType = yield call(getDBDocument, 'answers', uid)
    const results: AnswersType = yield select((store: IStore) => store.results)
    yield put(compareActions.setCompare({ answers, results }))
    yield put(answersActions.updateAnswers({ answers, uid }))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

function* submitResultsSaga(action: ActionType<SubmitResultsType>) {
  const { results, selectedWeek, toaster } = action.payload
  yield put(appActions.setLoading(true))

  try {
    yield call(writeDBDocument, 'results', selectedWeek, results[selectedWeek])
    yield put(resultsActions.setResults(results))

    const response: AnswersType = yield call(getDBDocument, 'results', selectedWeek)
    const saveSuccess: boolean = yield call(objectCompare, response, results[selectedWeek])

    yield put(compareActions.updateCompare({ data: response, id: 'results' }))
    yield call(toaster, saveSuccess)
  } catch (error) {
    yield toaster(false)
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }

  yield put(appActions.setLoading(false))
}

function* submitAnswersSaga(action: ActionType<SubmitAnswersType>) {
  const { answers, uid, toaster, selectedWeek, firstData } = action.payload

  yield put(appActions.setLoading(true))
  try {
    if (firstData) {
      yield call(writeDBDocument, 'answers', uid, answers[uid])
    } else {
      yield call(updateDBDocument, 'answers', uid, selectedWeek, answers)
    }

    const response: AnswersType = yield call(getDBDocument, 'answers', uid)
    yield put(compareActions.updateCompare({ data: answers[uid], id: 'answers' }))

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
    const response: AnswersType = yield call(getDBDocument, 'answers', uid)
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
