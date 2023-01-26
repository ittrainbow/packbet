import React, { useEffect, useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useDispatch } from 'react-redux'

import { Context } from '../App'
import { db, auth } from '../db'
import { setLoading } from '../redux/actions'
import { getCurrentWeekId } from '../helpers'

export const Init = () => {
  const { appContext, setAppContext, setUserContext, setWeeksContext, setAbout } =
    useContext(Context)
  const [user] = useAuthState(auth)
  const dispatch = useDispatch()

  const fetch = async () => {
    try {
      await getDoc(doc(db, 'about', 'about')).then((response) => {
        const resp = response.data()
        const about = Object.keys(resp).map((el) => resp[el])
        setAbout(about)
      })

      await getDocs(collection(db, 'weeks')).then((response) => {
        const weeks = []
        response.forEach((el) => weeks.push(el.data()))
        const currentWeek = getCurrentWeekId(weeks)
        setAppContext({ ...appContext, currentWeek })
        setWeeksContext(weeks)
      })

      if (user) {
        await getDoc(doc(db, 'users', user.uid)).then((response) => {
          const user = response.data()
          setUserContext(user)
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    fetch()
    // eslint-disable-next-line
  }, [user])

  return <div></div>
}
