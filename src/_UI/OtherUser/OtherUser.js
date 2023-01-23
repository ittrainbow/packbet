import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './OtherUser.css'
import { actionCleanOtherUser } from '../../redux/actions/othersActions'
import { Button } from '..'

export const OtherUser = () => {
  const [isWeekList, setIsWeekList] = useState(false)
  const [isEditor, setIsEditor] = useState(false)
  const dispatch = useDispatch()
  const { weekId, weeks } = useSelector((state) => state.week)
  const { mobile } = useSelector((state) => state.view)
  const { isItYou, name } = useSelector((state) => state.others)

  useEffect(() => {
    const url = window.location.href.split('/')
    const last = url[url.length - 1]

    if (last === 'editor' || last === 'calendar') setIsWeekList(true)
    if (last === 'editor') setIsEditor(true)
    return
  }, [])

  const today = () => {
    const deadline = weekId ? weeks[weekId].deadline : null
    const currentTime = new Date().getTime()

    return currentTime < deadline
  }

  const render = () => {
    return (
      <div>
        <Button
          width={mobile ? 351 : 417}
          height={mobile ? 65 : 40}
          text={`Вы просматриваете ответы ${name}, нажмите для возврата к своим ответам`}
          onClick={() => dispatch(actionCleanOtherUser())}
        />
        <div className={mobile ? 'ActiveGamesNotifyMobile' : 'ActiveGamesNotify'}>
          {today() && !isWeekList ? 'Чужие прогнозы для активных игр скрыты' : null}
        </div>
      </div>
    )
  }

  return !isItYou && !isEditor ? render() : null
}
