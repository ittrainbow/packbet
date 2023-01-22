import React, { useEffect } from 'react'
import axios from '../../axios/axios'
import { useSelector, useDispatch } from 'react-redux'
import {
  actionInit,
  actionCurrentWeek,
  actionCreateStandings
} from '../../redux/actions/weekActions'
import { getWeeks } from '../../frame/getWeeks'
import { actionSwitchLoading } from '../../redux/actions/loadingActions'
import { actionSetHeight } from '../../redux/actions/viewActions'

const InitState = () => {
  const dispatch = useDispatch()
  const { mobile } = useSelector((state) => state.view)

  useEffect(() => {
    dispatch(actionSwitchLoading(true))

    const initialFetch = async () => {
      try {
        const response = await axios.get('pack/weeks.json')
        const standings = await axios.get('pack/table.json')
        const weeks = getWeeks(response.data)
  
        dispatch(actionInit(weeks))
        dispatch(actionCurrentWeek(Object.keys(weeks).length - 1))
        dispatch(actionCreateStandings(standings.data))
      } catch (error) {
        console.error(error)
      }
    }

    initialFetch()
    dispatch(actionSwitchLoading(false))

    if (!mobile) {
      const height = Math.max( document.getElementById('container').offsetHeight + 40, window.innerHeight )
      dispatch(actionSetHeight(height))
    }

    return
  }, [])

  return <div></div>
}

export default InitState
