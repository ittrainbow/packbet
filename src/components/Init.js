import React, { useEffect, useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useDispatch } from 'react-redux'

import { Context } from '../App'
import { db, auth } from '../db'
import { setLoading } from '../redux/actions'
import { getCurrentWeekId, objectCompose } from '../helpers'

export const Init = () => {
  const {
    appContext,
    setAppContext,
    userContext,
    setUserContext,
    setWeeksContext,
    setAboutContext,
    setAnswersContext
  } = useContext(Context)
  const [user] = useAuthState(auth)
  const dispatch = useDispatch()

  const fetch = async () => {
    try {
      await getDocs(collection(db, 'weeks')).then((response) => {
        const weeks = objectCompose(response)
        const num = getCurrentWeekId(weeks)
        setAppContext({ ...appContext, currentWeek: num, nextWeek: num + 1 })
        setWeeksContext(weeks)
      })

      await getDocs(collection(db, 'answers')).then((response) => {
        const answers = objectCompose(response)
        setAnswersContext(answers)
      })

      if (user) {
        await getDoc(doc(db, 'users', user.uid)).then((response) => {
          const { name, email, admin } = response.data()
          setUserContext({ ...userContext, name, email, admin })
        })
      }

      await getDoc(doc(db, 'about', 'about')).then((response) => {
        const resp = response.data()
        const about = Object.keys(resp).map((el) => resp[el])
        setAboutContext(about)
      })
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    fetch()
    return // eslint-disable-next-line
  }, [user])

  return <div></div>
}
