import { call, put, select, takeEvery } from 'redux-saga/effects'

import { fetchStandingsSaga, setStandingsSaga } from '.'
import { deleteDBDocument, getDBCollection, getDBDocument, updateDBDocument, writeDBDocument } from '../../db'
import { getLocale, getObjectsEquality, getTable } from '../../helpers'
import { ActionType, AnswersType, IAnswers, IPlayers, IStore, IUser, IUserStandings, IUserStore } from '../../types'
import { answersActions, appActions, compareActions, resultsActions, userActions } from '../slices'
import * as TYPES from '../storetypes'

type UserUpdateType = {
  locale: 'ua' | 'ru'
  name: string
  uid: string
}

type BuddiesPayloadType = {
  buddies: string[]
  buddyUid: string
}

type SubmitResultsType = {
  results: AnswersType
  toaster: (value: boolean) => void
  selectedWeek: number
}

type ToasterType = {
  toaster: (value: boolean) => void
}

type SubmitAnswersType = {
  selectedWeek: number
  answers: { [key: string]: AnswersType }
  uid: string
  firstData: boolean
} & ToasterType

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
  user: {
    uid: string
    displayName: string
  }
  emailReg: boolean
}

function* userLoginSaga(action: ActionType<UserLoginType>) {
  const {
    user
    // emailReg
  } = action.payload
  const { uid, displayName } = user
  try {
    const responseUser: IUser | undefined = yield call(getDBDocument, 'users', uid)
    const user: IUser = responseUser || {
      name: displayName,
      admin: false,
      locale: getLocale(),
      buddies: [uid]
    }

    const answers: AnswersType = yield call(getDBDocument, 'answers', uid)
    const results: AnswersType = yield select((store: IStore) => store.results)

    // if (!responseUser || emailReg) yield call(fetchStandingsSaga)

    const gotOnRegister: string = yield select((store) => store.user.name)

    if (!gotOnRegister) {
      yield put(userActions.setUser(user.admin ? { ...user, adminAsPlayer: true } : user))
    }

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
  const data = results[selectedWeek]
  yield put(appActions.setLoading(true))

  try {
    if (data) {
      yield call(writeDBDocument, 'results', selectedWeek, results[selectedWeek])
    } else {
      yield call(deleteDBDocument, 'results', selectedWeek)
    }

    yield put(resultsActions.setResults(results))

    const response: AnswersType = yield call(getDBDocument, 'results', selectedWeek)
    const saveSuccess: boolean = yield call(getObjectsEquality, response, results[selectedWeek])
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

export function* updateStandingsSaga(action: ActionType<ToasterType>) {
  const { toaster } = action.payload
  const { app } = yield select((store: IStore) => store)
  try {
    const players: IPlayers = yield call(getDBCollection, 'users')
    const results: AnswersType = yield select((store: IStore) => store.results)
    const answers: IAnswers = yield call(getDBCollection, 'answers')

    const seasonArray: IUserStandings[] = getTable({ answers, players, results, fullSeason: true })
    const weekArray: IUserStandings[] = getTable({ answers, players, results, fullSeason: false })
    const season = Object.assign({}, seasonArray)
    const week = Object.assign({}, weekArray)

    yield call(writeDBDocument, `standings-${app.season}`, 'season', season)
    yield call(writeDBDocument, `standings-${app.season}`, 'week', week)
    yield call(setStandingsSaga, { season, week })

    yield call(toaster, true)
  } catch (error) {
    if (error instanceof Error) {
      yield call(toaster, false)
      yield put(appActions.setError(error.message))
    }
  }
}

function* setBuddiesSaga(action: ActionType<BuddiesPayloadType>) {
  const user: IUserStore = yield select((store) => store.user)
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
