import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, getDocs } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import structuredClone from '@ungap/structured-clone'

import { db, auth } from '../db'
import { setLoading } from '../redux/actions'
import { objectCompose, getWeeksIDs, tableCreator } from '../helpers'
import { useAppContext } from '../context/Context'

export const Init = () => {
  const {
    appContext,
    answersContext,
    setAppContext,
    userContext,
    setUserContext,
    setWeeksContext,
    setAboutContext,
    setAnswersContext,
    userListContext,
    setUserListContext,
    setCompareContext,
    setStandingsContext
  } = useAppContext()

  const [user] = useAuthState(auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const browserLocale = localStorage.getItem('locale')
    setUserContext({...userContext, locale: browserLocale}) // eslint-disable-next-line
  }, [])

  useEffect(() => {
    fetch() // eslint-disable-next-line
  }, [user])

  useEffect(() => {
    if (answersContext && userListContext) {
      setStandingsContext(tableCreator(answersContext, userListContext))
    } 
  }, [answersContext, userListContext, setStandingsContext])

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
        setCompareContext(structuredClone(answers))
      })

      await getDocs(collection(db, 'users')).then((response) => {
        const users = objectCompose(response)
        setUserListContext(users)
        if (user) {
          const { name, email, admin, locale } = users[user.uid]
          const browserLocale = localStorage.getItem('locale')
          if (locale !== browserLocale) localStorage.setItem('locale', locale)
          setUserContext({ ...userContext, name, email, admin, locale })
        }
      })

      await getDocs(collection(db, 'about')).then((response) => {
        const about = objectCompose(response)
        setAboutContext(about)
      })
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return 
}
