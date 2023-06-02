import React, { useState, useContext, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch } from 'react-redux'

import * as initialContext from './initialContexts'
import { db, auth } from '../db'
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
    fetchData() // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (answersContext && userListContext) {
      setStandingsContext(tableCreator(answersContext, userListContext))
    }
  }, [answersContext, userListContext])

  useEffect(() => {
    if (user && userListContext) {
      const { uid } = user
      const { name, email, admin, locale } = userListContext[uid]
      const browserLocale = localStorage.getItem('locale')
      locale !== browserLocale && localStorage.setItem('locale', locale)

      setUserContext({ ...userContext, name, email, admin, locale })
    } // eslint-disable-next-line
  }, [user, userListContext])

  const fetchFromDB = async (link) => {
    return getDocs(collection(db, link)).then((response) => {
      return objectCompose(response)
    })
  }

  const fetchData = async () => {
    try {
      const { season } = appContext
      
      const weeks = await fetchFromDB(`weeks${season}`)
      const answers = await fetchFromDB(`answers${season}`)
      const about = await fetchFromDB('about')
      const users = await fetchFromDB('users')
      const { currentWeek, nextWeek } = getWeeksIDs(weeks)

      setAppContext({ ...appContext, currentWeek, nextWeek, season })
      setWeeksContext(weeks)
      setAnswersContext(answers)
      setCompareContext(structuredClone(answers))
      setAboutContext(about)
      setUserListContext(users)
    } catch (error) {
      console.error(error)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const clearUserContext = (locale) => {
    setUserContext({ ...user, locale })
  }

  const setResultsContext = (value) => {
    const { selectedWeek } = appContext
    const results = objectReplace(answersContext.results, selectedWeek, value)

    setAnswersContext({ ...answersContext, results })
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
