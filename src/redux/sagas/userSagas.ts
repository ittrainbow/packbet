import { takeEvery, call, put } from 'redux-saga/effects'

import { UPDATE_PROFILE, USER_LOGIN, FETCH_OTHER_USER, SUBMIT_RESULTS, SUBMIT_ANSWERS } from '../storetypes'
import { ActionType, IUser, AnswersType, IAnswers, RawUser, IUserStandings } from '../../types'
import { writeDBDocument, getDBCollection, getDBDocument, updateDBDocument } from '../../db'
import { appActions, answersActions, resultsActions, standingsActions, userActions, compareActions } from '../slices'
import { objectCompare, tableCreator } from '../../helpers'

type UserUpdateType = {
  locale: 'ua' | 'ru'
  name: string
  uid: string
}

type SubmitResultsType = {
  results: AnswersType
  toaster: (value: boolean) => void
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

    const answers: AnswersType = yield call(getDBDocument, 'answers2023', uid)
    yield put(answersActions.updateAnswers({ answers, uid }))

    const results: AnswersType = yield call(getDBDocument, 'results2023', 'results')
    yield put(resultsActions.setResults(results))
    yield put(compareActions.setCompare({ answers, results }))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

function* setStandingsSaga(results: AnswersType) {
  const answers: IAnswers = yield call(getDBCollection, 'answers2023')
  const players: { [key: string]: RawUser } = yield call(getDBCollection, 'users')
  const standingsArray: IUserStandings[] = tableCreator(answers, players, results)

  return Object.assign({}, standingsArray)
}

function* submitResultsSaga(action: ActionType<SubmitResultsType>) {
  const { results, toaster } = action.payload
  yield put(appActions.setLoading(true))

  try {
    const standings: IUserStandings[] = yield call(setStandingsSaga, results)

    yield call(writeDBDocument, 'results2023', 'results', results)
    yield call(writeDBDocument, 'results2023', 'standings', standings)
    yield put(standingsActions.setStandings(standings))
    yield put(resultsActions.setResults(results))

    const response: AnswersType = yield call(getDBDocument, 'results2023', 'results')
    const saveSuccess: boolean = yield call(objectCompare, response, results)

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
      yield call(writeDBDocument, 'answers2023', uid, answers[uid])
    } else {
      yield call(updateDBDocument, 'answers2023', uid, selectedWeek, answers)
    }

    const response: AnswersType = yield call(getDBDocument, 'answers2023', uid)
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
    const response: AnswersType = yield call(getDBDocument, 'answers2023', uid)
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
