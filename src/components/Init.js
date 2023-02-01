import React, { useEffect, useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import structuredClone from '@ungap/structured-clone'

import { Context } from '../App'
import { db, auth } from '../db'
import { setLoading } from '../redux/actions'
import { objectCompose, getWeeksIDs, tableObjectCreator } from '../helpers'

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
  } = useContext(Context)
  const [user] = useAuthState(auth)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch() // eslint-disable-next-line
  }, [user])

  useEffect(() => {
    if (answersContext && userListContext) {
      tableCreator()
    } // eslint-disable-next-line
  }, [answersContext, userListContext])

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

  const tableCreator = () => {
    const userList = Object.keys(userListContext)
    const object = {}
    userList.forEach((el) => {
      let ansTotal = 0
      let ansCorrect = 0
      let resultsTotal = 0
      const uid = el
      const { name } = userListContext[el]
      const ans = answersContext ? answersContext[el] : null
      const res = answersContext.results || null
      Object.keys(res).forEach((el) => {
        const subAns = ans ? ans[el] : null
        Object.keys(res[el]).forEach((i) => {
          resultsTotal++
          if (subAns && subAns[i]) ansTotal++
          if (subAns && subAns[i] && subAns[i] === res[el][i]) ansCorrect++
        })
      })

      const { total, correct, slash } = tableObjectCreator(ansTotal, ansCorrect, resultsTotal)
      object[el] = { name, uid, slash, total, correct }

      const array = []
      Object.keys(object).map((el) => array.push(object[el]))
      const compare = (a, b) => (a.correct < b.correct ? 1 : a.correct > b.correct ? -1 : 0)
      array.sort(compare)
      setStandingsContext(array)
    })
  }

  return <div></div>
}
