import React, { useState, useContext, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch } from 'react-redux'

import * as initialContext from './initialContexts'
import { db, auth } from '../db'
import { setLoading } from '../redux/actions'
import { objectCompose, getWeeksIDs, tableCreator, objectReplace } from '../helpers'

export const Context = React.createContext()

export const useAppContext = () => useContext(Context)

export const ContextProvider = ({ children }) => {
  const {
    initialAboutContext,
    initialWeeksContext,
    initialUserContext,
    initialAppContext,
    initialEditorContext
  } = initialContext
  const [aboutContext, setAboutContext] = useState(initialAboutContext)
  const [weeksContext, setWeeksContext] = useState(initialWeeksContext)
  const [appContext, setAppContext] = useState(initialAppContext)
  const [userContext, setUserContext] = useState(initialUserContext)
  const [editorContext, setEditorContext] = useState(initialEditorContext)
  const [answersContext, setAnswersContext] = useState()
  const [userListContext, setUserListContext] = useState()
  const [compareContext, setCompareContext] = useState()
  const [standingsContext, setStandingsContext] = useState()
  const [user] = useAuthState(auth)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchAppData() // eslint-disable-next-line
  }, [])

  useEffect(() => {
    user && fetchUserData() // eslint-disable-next-line
  }, [user])

  useEffect(() => {
    if (answersContext && userListContext) {
      setStandingsContext(tableCreator(answersContext, userListContext))
    }
  }, [answersContext, userListContext])

  const fetchUserData = async () => {
    try {
      await getDocs(collection(db, 'users')).then((response) => {
        const users = objectCompose(response)
        const { uid } = user
        const { name, email, admin, locale } = users[uid]
        const browserLocale = localStorage.getItem('locale')
        locale !== browserLocale && localStorage.setItem('locale', locale)

        setUserListContext(users)
        setUserContext({ ...userContext, name, email, admin, locale })
      })

      await getDocs(collection(db, 'users')).then((response) => {
        const users = objectCompose(response)
        const { name, email, admin, locale } = users[user.uid]
        const browserLocale = localStorage.getItem('locale')
        locale !== browserLocale && localStorage.setItem('locale', locale)

        setUserListContext(users)
        setUserContext({ ...userContext, name, email, admin, locale })
      })
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAppData = async () => {
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

  const clearUserContext = (locale) => {
    setUserContext({ ...user, locale })
  }

  const clearEditorContext = () => {
    setEditorContext(initialEditorContext)
  }

  const setResultsContext = (value) => {
    const { selectedWeek } = appContext
    const newResults = objectReplace(answersContext.results, selectedWeek, value)
    
    setAnswersContext({ ...answersContext, results: newResults })
  }

  return (
    <Context.Provider
      value={{
        weeksContext,
        setWeeksContext,
        appContext,
        setAppContext,
        userContext,
        setUserContext,
        clearUserContext,
        aboutContext,
        setAboutContext,
        answersContext,
        setAnswersContext,
        setResultsContext,
        editorContext,
        setEditorContext,
        clearEditorContext,
        userListContext,
        setUserListContext,
        compareContext,
        setCompareContext,
        standingsContext,
        setStandingsContext
      }}
    >
      {children}
    </Context.Provider>
  )
}
