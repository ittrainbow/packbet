import { spawn, call, all } from 'redux-saga/effects'

import { initSaga, editorSagas, userSaga } from '.'

export function* rootSaga() {
  const sagas = [initSaga, editorSagas, userSaga]
  const retrySagas = sagas.map((saga) => {
    return spawn(function* () {
      while (true) {
        try {
          yield call(saga)
          break
        } catch (error) {
          console.error(error)
        }
      }
    })
  })

  yield all(retrySagas)
}
