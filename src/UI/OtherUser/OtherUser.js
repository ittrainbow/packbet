import React, { useContext } from 'react'

import './OtherUser.scss'

import { Context } from '../../App'

export const OtherUser = () => {
  const { appContext, setAppContext } = useContext(Context)
  const { otherUserName, isItYou } = appContext

  const onClickHandler = () => {
    setAppContext({
      ...appContext,
      isItYou: true,
      otherUserName: null,
      otherUserUID: null
    })
  }

  return isItYou ? null : (
    <div>
      <button className="otheruser" onClick={() => onClickHandler()}>
        Вы просматриваете ответы <b>{otherUserName}</b>, прогнозы не начавшихся игр скрыты.
        Нажмите для возвращения к своему профилю.
      </button>
    </div>
  )
}
