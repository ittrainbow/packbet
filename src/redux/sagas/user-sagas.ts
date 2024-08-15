import { call, put, select, takeEvery } from 'redux-saga/effects'

import { fetchStandingsSaga, setStandingsSaga } from '.'
import { deleteDBDocument, getDBCollection, getDBDocument, updateDBDocument, writeDBDocument } from '../../db'
import { Action, Answers, AnswersStore, ExtendedUser, Store, User, Users, UserStandings } from '../../types'
import { getLocale, getObjectsEquality, getTable } from '../../utils'
import { answersActions, appActions, compareActions, resultsActions, userActions } from '../slices'
import * as TYPES from '../storetypes'

function* updateProfileSaga(
  action: Action<{
    locale: 'ua' | 'ru'
    name: string
    uid: string
  }>
) {
  yield put(appActions.setLoading(true))

  const { payload } = action
  const { uid, name, locale } = payload

  try {
    const response: User = yield call(getDBDocument, 'users', uid)
    const data = { ...response, name, locale }
    yield call(writeDBDocument, 'users', uid, data)
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }

  yield put(appActions.setLoading(false))
}

function* userLoginSaga(
  action: Action<{
    user: {
      uid: string
      displayName: string
    }
    emailReg: boolean
  }>
) {
  const { uid, displayName } = action.payload.user

  try {
    const responseUser: User | undefined = yield call(getDBDocument, 'users', uid)
    const user: User = responseUser ?? {
      name: displayName,
      admin: false,
      locale: getLocale() ?? 'ru',
      buddies: [uid]
    }

    localStorage.setItem('packContestLocale', user.locale)

    const fetchedAnswers: Answers = yield call(getDBDocument, 'answers', uid)
    const answers = fetchedAnswers ?? {}
    const results: Answers = yield select((store: Store) => store.results)
    const gotOnRegister: string = yield select((store) => store.user.name)
    const writeUserToStore = user.admin ? { ...user, adminAsPlayer: true } : user

    if (!gotOnRegister) {
      yield put(userActions.setUser(writeUserToStore))
    }

    yield put(compareActions.setCompare({ answers, results }))
    yield put(answersActions.updateAnswers({ answers, uid }))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

function* submitResultsSaga(
  action: Action<{
    results: Answers
    toaster: (value: boolean) => void
    selectedWeek: number
  }>
) {
  const { results, selectedWeek, toaster } = action.payload
  const data = results[selectedWeek]

  yield put(appActions.setLoading(true))

  try {
    if (data) {
      yield call(writeDBDocument, 'results', selectedWeek, results[selectedWeek])
    } else {
      yield call(deleteDBDocument, 'results', selectedWeek.toString())
    }

    const response: Answers = yield call(getDBDocument, 'results', selectedWeek)
    const saveSuccess: boolean = yield call(getObjectsEquality, response, results[selectedWeek])

    yield put(resultsActions.setResults(results))
    yield put(compareActions.updateCompare({ data: results, id: 'results' }))
    yield call(fetchStandingsSaga)
    yield call(toaster, saveSuccess)
  } catch (error) {
    yield toaster(false)
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }

  yield put(appActions.setLoading(false))
}

function* submitAnswersSaga(
  action: Action<{
    selectedWeek: number
    answers: { [key: string]: Answers }
    uid: string
    firstData: boolean

    toaster: (value: boolean) => void
  }>
) {
  const { answers, uid, toaster, selectedWeek, firstData } = action.payload
  yield put(appActions.setLoading(true))
  try {
    if (firstData) {
      yield call(writeDBDocument, 'answers', uid, answers[uid])
    } else {
      yield call(updateDBDocument, 'answers', uid, selectedWeek, answers)
    }

    const response: Answers = yield call(getDBDocument, 'answers', uid)
    yield put(compareActions.updateCompare({ data: answers[uid], id: 'answers' }))

    const saveSuccess: boolean = yield call(getObjectsEquality, response, answers[uid])
    yield call(toaster, saveSuccess)
  } catch (error) {
    yield toaster(false)
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
  yield put(appActions.setLoading(false))
}

function* fetchOtherUserSaga(action: Action<string>) {
  const uid = action.payload
  try {
    const response: Answers = yield call(getDBDocument, 'answers', uid)
    yield put(answersActions.updateAnswers({ answers: response, uid }))
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

export function* updateStandingsSaga(
  action: Action<{
    toaster: (value: boolean) => void
  }>
) {
  const { toaster } = action.payload
  const { app } = yield select((store: Store) => store)
  const { standings } = yield select((store: Store) => store)
  try {
    const users: Users = yield call(getDBCollection, 'users')
    const answers: AnswersStore = yield call(getDBCollection, 'answers')
    const results: Answers = yield select((store: Store) => store.results)

    const seasonArray: UserStandings[] = getTable({ answers, users, results, fullSeason: true })
    const weekArray: UserStandings[] = getTable({ answers, users, results, fullSeason: false })
    // TODO - switch seasons
    const season2023 = Object.assign({}, seasonArray)
    const week2023 = Object.assign({}, weekArray)

    yield call(writeDBDocument, 'standings', `season${app.season}`, season2023)
    yield call(writeDBDocument, 'standings', `week${app.season}`, week2023)
    yield call(setStandingsSaga, { ...standings, season2023, week2023 })

    yield call(toaster, true)
  } catch (error) {
    if (error instanceof Error) {
      yield call(toaster, false)
      yield put(appActions.setError(error.message))
    }
  }
}

function* setBuddiesSaga(
  action: Action<{
    buddies: string[]
    buddyUid: string
  }>
) {
  const user: ExtendedUser = yield select((store) => store.user)
  const { buddyUid, buddies } = action.payload
  const { uid, adminAsPlayer, ...newUser } = user
  const newBuddies = buddies.includes(buddyUid) ? buddies.filter((el) => el !== buddyUid) : [...buddies, buddyUid]
  newUser.buddies = newBuddies

  try {
    yield put(userActions.setBuddies(newBuddies))
    yield call(writeDBDocument, 'users', user.uid, newUser)
  } catch (error) {
    if (error instanceof Error) {
      yield put(appActions.setError(error.message))
    }
  }
}

export function* userSaga() {
  yield takeEvery(TYPES.UPDATE_PROFILE, updateProfileSaga)
  yield takeEvery(TYPES.USER_LOGIN, userLoginSaga)
  yield takeEvery(TYPES.SUBMIT_RESULTS, submitResultsSaga)
  yield takeEvery(TYPES.SUBMIT_ANSWERS, submitAnswersSaga)
  yield takeEvery(TYPES.FETCH_OTHER_USER, fetchOtherUserSaga)
  yield takeEvery(TYPES.SET_BUDDIES, setBuddiesSaga)
  yield takeEvery(TYPES.UPDATE_STANDINGS, updateStandingsSaga)
}
