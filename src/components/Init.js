import React, { useEffect, useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useDispatch } from 'react-redux'

import { Context } from '../App'
import { db, auth } from '../db'
import { setLoading } from '../redux/actions'
import { objectCompose, getWeeksIDs } from '../helpers'

export const Init = () => {
  const {
    appContext,
    userContext,
    setAppContext,
    setUserContext,
    setWeeksContext,
    setAboutContext,
    setAnswersContext,
    setUserListContext
  } = useContext(Context)
  const [user] = useAuthState(auth)
  const dispatch = useDispatch()

  const fetch = async () => {
    try {
      await getDocs(collection(db, 'weeks')).then((response) => {
        const weeks = objectCompose(response)
        const { currentWeek, nextWeek } = getWeeksIDs(weeks)
        setAppContext({ ...appContext, currentWeek, nextWeek })
        setWeeksContext(weeks)
      })

      await getDocs(collection(db, 'answers')).then((response) => {
        const answers = objectCompose(response)
        setAnswersContext(answers)
      })

      await getDocs(collection(db, 'users')).then((response) => {
        const users = objectCompose(response)
        setUserListContext(users)
        if (user) {
          const { name, email, admin } = users[user.uid]
          setUserContext({ ...userContext, name, email, admin })
        }
      })

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
    fetch() // eslint-disable-next-line
  }, [user])

  return <div></div>
}
